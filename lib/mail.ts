import nodemailer from "nodemailer";

export async function sendMail(name: string, email: string, message: string) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error("❌ Email Error: Missing EMAIL_USER or EMAIL_PASS environment variables.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  try {
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
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
