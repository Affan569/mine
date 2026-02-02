import fs from "fs";
import path from "path";
import os from "os";
import { randomUUID } from "crypto";

const root = process.cwd();
const tmpBase = process.env.TMPDIR || os.tmpdir();
let dataDir = path.join(root, "data");
let uploadsDir = path.join(root, "public", "uploads");

function ensureDir(dir: string) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch {
    if (dir.includes(path.join(root, "data"))) {
      dataDir = path.join(tmpBase, "portfolio-data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    }
    if (dir.includes(path.join(root, "public", "uploads"))) {
      uploadsDir = path.join(tmpBase, "portfolio-uploads");
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    }
  }
}

ensureDir(dataDir);
ensureDir(uploadsDir);

export function readJSON<T>(file: string): T {
  const p = path.join(dataDir, file);
  try {
    if (!fs.existsSync(p)) return JSON.parse("[]");
    const raw = fs.readFileSync(p, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return JSON.parse("[]");
  }
}

export function writeJSON<T>(file: string, data: T) {
  const p = path.join(dataDir, file);
  ensureDir(dataDir);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

export async function saveUpload(file: File): Promise<string> {
  const name = `${Date.now()}-${randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
  const arrayBuffer = await file.arrayBuffer();
  const dest = path.join(uploadsDir, name);
  const buf = Buffer.from(arrayBuffer as ArrayBuffer);
  ensureDir(uploadsDir);
  fs.writeFileSync(dest, buf);
  return `/uploads/${name}`;
}

export async function saveUploads(files: File[]): Promise<string[]> {
  const paths: string[] = [];
  for (const f of files) {
    const p = await saveUpload(f);
    paths.push(p);
  }
  return paths;
}

export type Project = {
  id: string;
  title: string;
  description: string;
  url?: string;
  image?: string;
  images?: string[];
  technologies?: string[];
  tags?: string[];
  createdAt: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
