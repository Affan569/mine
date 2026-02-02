import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, saveUpload, saveUploads, Project } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function GET() {
  const projects = readJSON<Project[]>("projects.json");
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const title = String(form.get("title") || "");
  const description = String(form.get("description") || "");
  const url = form.get("url") ? String(form.get("url")) : undefined;
  const technologiesRaw = String(form.get("technologies") || "");
  const technologies = technologiesRaw ? technologiesRaw.split(",").map((t) => t.trim()).filter(Boolean) : undefined;
  const imageFile = form.get("image") as File | null;
  const imagesFiles = form.getAll("images").filter((f) => f instanceof File) as File[];

  if (!title || !description) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  let image: string | undefined;
  let images: string[] | undefined;
  if (imageFile) {
    image = await saveUpload(imageFile);
  }
  if (imagesFiles && imagesFiles.length > 0) {
    images = await saveUploads(imagesFiles);
  }

  const projects = readJSON<Project[]>("projects.json");
  const project: Project = {
    id: randomUUID(),
    title,
    description,
    url,
    image,
    images,
    technologies,
    createdAt: new Date().toISOString(),
  };
  projects.unshift(project);
  writeJSON("projects.json", projects);
  return NextResponse.json(project, { status: 201 });
}
