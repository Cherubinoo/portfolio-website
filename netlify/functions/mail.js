const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    const {
      SMTP_USER,
      SMTP_PASS,
      SMTP_HOST = 'smtp.gmail.com',
      SMTP_PORT = 465,
      MAIL_TO,
    } = process.env;

    if (!SMTP_USER || !SMTP_PASS) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, error: 'Missing SMTP credentials' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const payload = JSON.parse(event.body || '{}');
    const { firstName, lastName, email, subject, message } = payload;
    if (!email || !subject || !message) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ ok: false, error: 'Missing required fields' }),
      };
    }

    const text = `From: ${firstName || ''} ${lastName || ''} <${email}>\nSubject: ${subject}\n\n${message}`.trim();

    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    // Log full error server-side for troubleshooting
    console.error('[netlify-mail] send error', err);
    const isProd = process.env.NODE_ENV === 'production';
    const safeMessage = isProd ? 'Failed to send' : (err && err.message ? String(err.message) : 'Failed to send');
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: safeMessage }),
    };
  }
};


