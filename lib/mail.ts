import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendMail(name: string, email: string, message: string): Promise<boolean> {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const resendKey = process.env.RESEND_API_KEY;

  if (!user || !pass) {
    console.error("❌ Email Error: Missing EMAIL_USER or EMAIL_PASS environment variables.");
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: "affanhussain.developer@gmail.com",
          replyTo: email,
          subject: `[Portfolio Inquiry] ${name}`,
          html: `<div><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p></div>`,
        });
        return true;
      } catch (e) {
        console.error("❌ Resend fallback error:", e);
      }
    }
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: "affanhussain.developer@gmail.com",
      replyTo: email,
      subject: `[Portfolio Inquiry] ${name} - ${new Date().toLocaleTimeString()}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: "affanhussain.developer@gmail.com",
          replyTo: email,
          subject: `[Portfolio Inquiry] ${name}`,
          html: `<div><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p></div>`,
        });
        return true;
      } catch (e) {
        console.error("❌ Resend fallback error:", e);
      }
    }
  }
  return false;
}
