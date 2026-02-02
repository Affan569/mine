import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON, Message } from "@/lib/storage";
import { randomUUID } from "crypto";

export async function GET() {
  const messages = readJSON<Message[]>("messages.json");
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const message = String(form.get("message") || "");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const messages = readJSON<Message[]>("messages.json");
  const item: Message = {
    id: randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  messages.unshift(item);
  writeJSON("messages.json", messages);
  return NextResponse.json({ ok: true }, { status: 201 });
}
