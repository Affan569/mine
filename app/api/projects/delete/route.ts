import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, Project } from "@/lib/storage";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const id = String(form.get("id") || "");
  if (!id) {
    return NextResponse.json({ error: "missing_id" }, { status: 400 });
  }
  const projects = readJSON<Project[]>("projects.json");
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const removed = projects.splice(idx, 1)[0];
  writeJSON("projects.json", projects);

  const toDelete: string[] = [];
  if (removed.image) toDelete.push(removed.image);
  if (removed.images && removed.images.length) toDelete.push(...removed.images);

  for (const rel of toDelete) {
    if (rel.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", rel.replace("/uploads/", "uploads/"));
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch {}
    }
  }

  return NextResponse.json({ ok: true });
}
