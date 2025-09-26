import nodemailer from 'nodemailer';

const {
  SMTP_USER,
  SMTP_PASS,
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = 465,
  MAIL_TO = process.env.SMTP_USER,
} = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.warn('[mail] Missing SMTP_USER/SMTP_PASS in environment variables');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // true for 465
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, subject, message } = req.body || {};
    if (!email || !subject || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const text = `From: ${firstName || ''} ${lastName || ''} <${email}>
Subject: ${subject}

${message}`.trim();

    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('[mail] send error', err);
    res.status(500).json({ ok: false, error: 'Failed to send' });
  }
}
