import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

// Netlify/Vercel support standard Node.js runtime
export const runtime = "nodejs";

export async function POST(req: Request) {
  let name = "";
  let email = "";
  let message = "";

  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      email = body.email;
      message = body.message;
    } else {
      const fd = await req.formData();
      name = String(fd.get("name") || "");
      email = String(fd.get("email") || "");
      message = String(fd.get("message") || "");
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Email bheinjne ka process - isay AWAIT lazmi karain
    const mailOk = await sendMail(name, email, message);

    if (mailOk) {
      return NextResponse.json({ ok: true, message: "Email sent successfully!" });
    } else {
      return NextResponse.json({ ok: false, error: "Mail failed to send" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}