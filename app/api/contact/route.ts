import * as nodemailer from "nodemailer";
import { renderMainFormEmail } from "@/lib/email/MainForm-Email";
import { renderStudioRentEmail } from "@/lib/email/StudioRent-Email";
import { renderBookingInquiryEmail } from "@/lib/email/BookASlotForm-Email";


export async function POST(req: Request) {
  try {
    const { type, ...payload } = await req.json();

    let email;

    switch (type) {
      case "mainForm":
        email = renderMainFormEmail(payload);
        break;

      case "studio_rent":
        email = renderStudioRentEmail(payload);
        break;
        
      case "book_a_slot":
        email = renderBookingInquiryEmail(payload);
        break;

      default:
        return Response.json(
          { message: "Invalid email type" },
          { status: 400 }
        );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    await transporter.sendMail({
      from: `<${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER!,
      subject: email.subject,
      replyTo: email.replyTo,
      text: email.text,
      html: email.html,
    });

    return Response.json({ message: "Email sent successfully" });
  } catch (err: any) {
    console.error("MAIL ERROR:", err);
    return Response.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}