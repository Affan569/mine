import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendMail(name: string, email: string, message: string): Promise<boolean> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const resendKey = process.env.RESEND_API_KEY;

  // Method 1: Resend (Best for Netlify/Vercel)
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: "affanhussain.developer@gmail.com",
        replyTo: email,
        subject: `[Portfolio] New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #4f46e5;">New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
          </div>
        `,
      });
      console.log("✅ Email sent via Resend");
      return true;
    } catch (error) {
      console.error("❌ Resend Error:", error);
    }
  }

  // Method 2: Nodemailer/Gmail (Fallback)
  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: user,
        to: "affanhussain.developer@gmail.com",
        replyTo: email,
        subject: `[Portfolio] ${name} contacted you`,
        text: `From: ${name} (${email})\n\n${message}`,
      });
      console.log("✅ Email sent via Gmail");
      return true;
    } catch (error) {
      console.error("❌ Gmail Error:", error);
    }
  }

  return false;
}