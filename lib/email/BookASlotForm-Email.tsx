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

export function renderBookingInquiryEmail(
  data: BookingInquiryEmailPayload
) {
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
New Booking Inquiry

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Booking Date: ${bookingDate}

Company: ${company || "N/A"}
Website: ${website || "N/A"}

Camera Angles:
${angle?.length ? angle.join(", ") : "N/A"}

Editing Required: ${editing || "N/A"}
Total Projects: ${totalProjects || "N/A"}

Remarks:
${remarks || "N/A"}
  `.trim();

  const html = `
<div style="font-family: Arial, sans-serif; line-height:1.6; color:#111;">
  <h2>New Booking Inquiry</h2>

  <table cellpadding="6" cellspacing="0">
    <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
    <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
    <tr><td><strong>Phone:</strong></td><td>${phone || "N/A"}</td></tr>
    <tr><td><strong>Booking Date:</strong></td><td>${bookingDate}</td></tr>
    <tr><td><strong>Company:</strong></td><td>${company || "N/A"}</td></tr>
    <tr><td><strong>Website:</strong></td><td>${website || "N/A"}</td></tr>
    <tr><td><strong>Editing:</strong></td><td>${editing || "N/A"}</td></tr>
    <tr><td><strong>Total Projects:</strong></td><td>${totalProjects || "N/A"}</td></tr>
  </table>

  <h3>Camera Angles</h3>
  <p>${angle?.length ? angle.join(", ") : "N/A"}</p>

  <h3>Remarks</h3>
  <p style="white-space: pre-line;">
    ${remarks || "N/A"}
  </p>
</div>
  `.trim();

  return {
    subject: `New Booking Inquiry – ${name}`,
    replyTo: email,
    text,
    html,
  };
}