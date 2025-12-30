export interface MainFormEmailPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  servicesSummary?: string;
}

export function renderMainFormEmail(data: MainFormEmailPayload) {
  const { name, email, phone, message, servicesSummary } = data;
  const dateStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const text = `
Name: ${name}
Email: ${email}
Phone: ${phone}
${servicesSummary ? `SERVICES REQUESTED:\n${servicesSummary}\n` : ""}

MESSAGE:
${message}
  `.trim();

  const html = `
<div style="background-color: #f4f4f7; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <div style="height: 4px; background-color: #2563eb;"></div>
          
          <div style="padding: 40px;">
            <h2 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">Home_FORM</h2>

            <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 12px 0; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Client Information</h3>
            
            <table width="100%" style="margin-bottom: 32px;">
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 100px;">Name</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Phone</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111827;">${phone || "—"}</td>
              </tr>
            </table>

            ${servicesSummary ? `
              <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 12px 0;">Services Requested</h3>
              <div style="background-color: #f8fafc; border-left: 3px solid #e2e8f0; padding: 16px; margin-bottom: 32px; font-size: 14px; color: #334155; line-height: 1.6;">
               <b> ${servicesSummary.replace(/\n/g, '<br>')}</b>
              </div>
            ` : ""}

            <h3 style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #9ca3af; margin: 0 0 12px 0;">Message</h3>
            <div style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap; background-color: #ffffff; border: 1px solid #f3f4f6; padding: 16px; border-radius: 4px;">${message}</div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</div>
  `.trim();

  return {
    subject: `[APS Inquiry] ${name}`,
    replyTo: email,
    text,
    html,
  };
}