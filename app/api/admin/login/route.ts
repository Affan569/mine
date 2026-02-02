import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD || "admin";
  if (password !== expected) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6,
  });
  return res;
}
