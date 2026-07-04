import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Resend initialization (optional - server works without email)
let resend = null;
if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('📧 E-Mail service initialized (Resend)');
} else {
  console.log('ℹ️  E-Mail service disabled (no RESEND_API_KEY set)');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { vorname, nachname, email, unternehmen, telefon, interest, nachricht } = req.body;

    // Validate required fields
    if (!vorname || !nachname || !email || !interest || !nachricht) {
      return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
    }

    if (!resend) {
      return res.status(200).json({ 
        success: true, 
        message: 'E-Mail service is not configured. Your message was received.',
        note: 'RESEND_API_KEY not set'
      });
    }

    // Send email to admin
    const data = await resend.emails.send({
      from: 'NSTech Kontakt <onboarding@resend.dev>',
      to: ['erol.isildak@pointr.tech'],
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
                Diese E-Mail wurde über das Kontaktformular auf nstech.de gesendet.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'NSTech <onboarding@resend.dev>',
      to: [email],
      subject: 'Vielen Dank für Ihre Nachricht - NSTech',
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
              <p><strong>NSTech QA & ISO-Zertifizierung</strong><br>
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
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' });
    }

    if (!resend) {
      return res.status(200).json({ 
        success: true, 
        message: 'Newsletter-Anmeldung erfolgreich!',
        note: 'RESEND_API_KEY not set'
      });
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: 'NSTech Newsletter <onboarding@resend.dev>',
      to: [email],
      subject: 'Willkommen beim NSTech Newsletter!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0056b3; color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f4f7f6; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 30px; background: #0056b3; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Willkommen beim NSTech Newsletter!</h1>
            </div>
            <div class="content">
              <p>Vielen Dank für Ihr Interesse an unserem Newsletter!</p>
              <p>Sie erhalten ab sofort regelmäßige Updates zu:</p>
              <ul>
                <li>✅ QA & Testing Best Practices</li>
                <li>✅ ISO-Zertifizierungs-Neuigkeiten</li>
                <li>✅ Software-Qualitäts-Trends</li>
                <li>✅ Exklusive Einblicke und Tipps</li>
              </ul>
              <p>Alle Informationen sind DSGVO-konform und Sie können sich jederzeit abmelden.</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p><strong>NSTech QA & ISO-Zertifizierung</strong><br>
              Ihr Partner für Software-Qualität in Deutschland</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Notify admin about new subscriber
    await resend.emails.send({
      from: 'NSTech Newsletter <onboarding@resend.dev>',
      to: ['erol.isildak@pointr.tech'],
      subject: 'Neue Newsletter-Anmeldung',
      html: `
        <h3>Neue Newsletter-Anmeldung</h3>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Datum:</strong> ${new Date().toLocaleString('de-DE')}</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Newsletter-Anmeldung erfolgreich!' 
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ 
      error: 'Fehler bei der Newsletter-Anmeldung. Bitte versuchen Sie es später erneut.' 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});
