import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    let name, email, message;

    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const formData = await req.formData();
      name = formData.get("name");
      email = formData.get("email");
      message = formData.get("message");
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "fields_missing" }, { status: 400 });
    }

    const isSent = await sendMail(String(name), String(email), String(message));

    if (isSent) {
      return NextResponse.json({ ok: true, mail: true });
    } else {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}