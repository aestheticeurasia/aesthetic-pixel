export interface StudioRentEmailPayload {
  name: string;
  phone: string;
  bookingDate: string;
  rentingHour: string;
  project?: string;
}

export function renderStudioRentEmail(data: StudioRentEmailPayload) {
  return {
    subject: `Studio Rent Inquiry – ${data.name}`,
    replyTo: undefined,
    text: `
Studio Rent Inquiry

Name: ${data.name}
Phone: ${data.phone}
Booking Date: ${data.bookingDate}
Hours Needed: ${data.rentingHour}

Project Details:
${data.project || "N/A"}
    `.trim(),

    html: `
<div style="font-family: Arial, sans-serif; line-height:1.6;">
  <h2>Studio Rent Inquiry</h2>

  <table cellpadding="6">
    <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
    <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
    <tr><td><strong>Booking Date:</strong></td><td>${data.bookingDate}</td></tr>
    <tr><td><strong>Hours Needed:</strong></td><td>${data.rentingHour}</td></tr>
  </table>

  <h3>Project Details</h3>
  <p>${data.project || "N/A"}</p>
</div>
    `.trim(),
  };
}
