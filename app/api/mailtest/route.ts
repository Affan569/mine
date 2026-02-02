import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

export async function GET() {
  const ok = await sendMail("Test Mail", "no-reply@example.com", "This is a test email from portfolio.");
  return NextResponse.json({ ok });
}
