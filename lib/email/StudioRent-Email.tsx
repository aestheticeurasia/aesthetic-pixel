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
Name:         ${data.name}
Phone:        ${data.phone}
Booking Date: ${data.bookingDate}
Duration:     ${data.rentingHour}

Project Details:
${data.project || "No additional details provided."}
    `.trim(),

    html: `
<div style="background-color: #f9fafb; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #374151;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <div style="background-color: #111827; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
        Studio Hire_Form
      </h1>
    </div>

    <div style="padding: 32px;">
      <p style="margin-top: 0; font-size: 16px; color: #4b5563;">You have received a new studio booking request. Details are provided below:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px;">Customer Name</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; font-size: 14px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Phone Number</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; font-size: 14px;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Booking Date</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; font-size: 14px;">${data.bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Hours Needed</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 500; font-size: 14px;">${data.rentingHour}</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.025em; margin-bottom: 8px;">Project Description</h3>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; color: #374151; font-size: 14px; line-height: 1.5;">
        ${data.project || "<em>No project details provided.</em>"}
      </div>
    </div>
  </div>
</div>
    `.trim(),
  };
}