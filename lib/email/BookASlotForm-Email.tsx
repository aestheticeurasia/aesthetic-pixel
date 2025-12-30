export interface BookingInquiryEmailPayload {
  name: string;
  email: string;
  phone?: string;
  bookingDate: string;
  company?: string;
  website?: string;
  angle?: string[]; 
  editing?: string;
  totalProjects?: string;
  remarks?: string;
}

export function renderBookingInquiryEmail(data: BookingInquiryEmailPayload) {
  const {
    name,
    email,
    phone,
    bookingDate,
    company,
    website,
    angle,
    editing,
    totalProjects,
    remarks,
  } = data;

  const text = `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Company: ${company || "N/A"}
Website: ${website || "N/A"}
Booking Date: ${bookingDate}
Total Projects: ${totalProjects || "N/A"}
Editing: ${editing || "N/A"}
Camera Angles: ${angle?.length ? angle.join(", ") : "N/A"}

REMARKS
${remarks || "N/A"}
  `.trim();

  const html = `
<div style="background-color: #f9fafb; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #374151;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <div style="background-color: #111827; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px; text-transform: uppercase;">Book a Slot_Form</h1>
    </div>

    <div style="padding: 32px;">
      <p style="margin-top: 0; margin-bottom: 24px; font-size: 16px;">You have received a new inquiry from the website. Details are provided below:</p>
      
      <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 16px;">Client Information</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 35%;">Name</td>
          <td style="padding: 8px 0; color: #111827;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Phone</td>
          <td style="padding: 8px 0; color: #111827;">${phone || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Company</td>
          <td style="padding: 8px 0; color: #111827;">${company || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Website</td>
          <td style="padding: 8px 0;"><a href="${website}" style="color: #2563eb; text-decoration: none;">${website || "—"}</a></td>
        </tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 16px;">Project Specifications</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 35%;">Booking Date</td>
          <td style="padding: 8px 0; color: #111827;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Total Projects</td>
          <td style="padding: 8px 0; color: #111827;">${totalProjects || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Editing Required</td>
          <td style="padding: 8px 0; color: #111827;">${editing || "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600;">Camera Angles</td>
          <td style="padding: 8px 0; color: #111827;">
            ${angle?.length ? angle.map(a => `<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 13px; margin-right: 4px;">${a}</span>`).join('') : "—"}
          </td>
        </tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 16px;">Remarks</h3>
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #d1d5db; font-style: italic; color: #4b5563; white-space: pre-line;">
        ${remarks || "No additional remarks provided."}
      </div>
    </div>
</div>
  `.trim();

  return {
    subject: `New Inquiry: ${name} [${bookingDate}]`,
    replyTo: email,
    text,
    html,
  };
}