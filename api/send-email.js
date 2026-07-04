// Resend API Email Handler
// This serverless function handles contact form submissions

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { vorname, nachname, email, unternehmen, telefon, interest, nachricht } = req.body;

    // Validate required fields
    if (!vorname || !nachname || !email || !interest || !nachricht) {
      return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Nexus Global Kontakt <onboarding@resend.dev>', // Update with your verified domain
      to: ['erol.isildak@pointr.tech'], // Your email
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${vorname} ${nachname}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0056b3; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f4f7f6; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0056b3; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 Neue Kontaktanfrage</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${vorname} ${nachname}</div>
              </div>
              
              <div class="field">
                <div class="label">E-Mail:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${unternehmen ? `
              <div class="field">
                <div class="label">Unternehmen:</div>
                <div class="value">${unternehmen}</div>
              </div>
              ` : ''}
              
              ${telefon ? `
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value">${telefon}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Interessiert an:</div>
                <div class="value">${interest}</div>
              </div>
              
              <div class="field">
                <div class="label">Nachricht:</div>
                <div class="value">${nachricht.replace(/\n/g, '<br>')}</div>
              </div>
              
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #666;">
                Diese E-Mail wurde über das Kontaktformular auf Nexus Global.de gesendet.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'Nexus Global <onboarding@resend.dev>', // Update with your verified domain
      to: [email],
      subject: 'Vielen Dank für Ihre Nachricht - Nexus Global',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0056b3; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f4f7f6; padding: 30px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vielen Dank, ${vorname}!</h1>
            </div>
            <div class="content">
              <p>Ihre Nachricht wurde erfolgreich übermittelt.</p>
              <p>Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
              <p>Bei dringenden Anfragen können Sie uns auch direkt telefonisch erreichen.</p>
              <hr style="margin: 20px 0;">
              <p><strong>Nexus Global QA & ISO-Zertifizierung</strong><br>
              📧 erol.isildak@pointr.tech<br>
              📱 +49 XXX XXXXXXX</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'E-Mail erfolgreich gesendet',
      id: data.id 
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.' 
    });
  }
}
