import { NextResponse } from "next/server";
import { readJSON, writeJSON, Message } from "@/lib/storage";
import { randomUUID } from "crypto";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let name = "";
  let email = "";
  let message = "";

  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    name = String(body.name || "");
    email = String(body.email || "");
    message = String(body.message || "");
  } else {
    const fd = await req.formData();
    name = String(fd.get("name") || "");
    email = String(fd.get("email") || "");
    message = String(fd.get("message") || "");
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  try {
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
  } catch {}

  let mailOk = false;
  try {
    mailOk = await sendMail(name, email, message);
  } catch {}

  return NextResponse.json({ ok: true, mail: mailOk });
}
