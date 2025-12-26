import * as nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      servicesSummary,
    } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      return Response.json(
        { message: "Server email env is missing (EMAIL_USER / EMAIL_PASS)." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `<${user}>`,
      to: process.env.EMAIL_TO || user,
      replyTo: email,
      subject: `APS_HOME: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

${servicesSummary || "N/A"}

Message:
${message}
      `,
    });

    return Response.json({ message: "Sent successfully!" });
  } catch (err: any) {
    console.error("NODEMAILER ERROR:", err);
    return Response.json(
      { message: "Failed to send email", error: err?.message },
      { status: 500 }
    );
  }
};