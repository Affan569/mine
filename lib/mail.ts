import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendMail(name: string, email: string, message: string): Promise<boolean> {
  // Use Environment Variables (Netlify settings se uthayega)
  const user = process.env.EMAIL_USER || "affanhussain.developer@gmail.com";
  const pass = process.env.EMAIL_PASS || "eiyh mvuw yzpf yckm";
  const resendKey = process.env.RESEND_API_KEY || "re_GkbqfaLf_JrDYEqCEGYyt969bBevpfoSh";

  // Priority 1: Resend (Ye Netlify par 100% chalta hai)
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { data, error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", // Free tier par yehi rahega
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
      
      if (data) {
        console.log("✅ Email sent via Resend");
        return true;
      }
      if (error) throw error;
    } catch (error) {
      console.error("❌ Resend Error:", error);
      // Agar Resend fail ho to niche Gmail chalega
    }
  }

  // Priority 2: Gmail (Nodemailer)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: user,
      to: "affanhussain.developer@gmail.com",
      replyTo: email,
      subject: `[Portfolio Inquiry] ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    console.log("✅ Email sent via Gmail");
    return true;
  } catch (error) {
    console.error("❌ Gmail Error:", error);
    return false;
  }
}