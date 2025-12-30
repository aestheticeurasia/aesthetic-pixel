
export interface ContactEmailPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  servicesSummary?: string;
}

export function renderMainFormEmail(data: ContactEmailPayload) {
  const {
    name,
    email,
    phone,
    message,
    servicesSummary,
  } = data;

  const text = `
New Contact Message (APS)

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}

${servicesSummary ? `Service Details:\n${servicesSummary}\n` : ""}

Message:
${message}
  `.trim();

  const html = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111">
  <h2 style="margin-bottom: 8px;">New Contact Message</h2>

  <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td><strong>Name:</strong></td>
      <td>${name}</td>
    </tr>
    <tr>
      <td><strong>Email:</strong></td>
      <td>${email}</td>
    </tr>
    <tr>
      <td><strong>Phone:</strong></td>
      <td>${phone || "N/A"}</td>
    </tr>
  </table>

  ${
    servicesSummary
      ? `
      <h3 style="margin-top: 20px;">Service Details</h3>
      <pre style="background:#f4f4f5; padding:12px; border-radius:6px;">
${servicesSummary}
      </pre>
    `
      : ""
  }

  <h3 style="margin-top: 20px;">Message</h3>
  <p style="white-space: pre-line;">${message}</p>
</div>
  `.trim();

  return {
    subject: `APS Contact – ${name}`,
    replyTo: email,
    text,
    html,
  };
}