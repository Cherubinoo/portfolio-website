const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env' });

const app = express();
app.use(cors());
app.use(express.json());

const {
  SMTP_USER,
  SMTP_PASS,
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = 465,
  MAIL_TO = process.env.SMTP_USER,
} = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  // eslint-disable-next-line no-console
  console.warn('[mail] Missing SMTP_USER/SMTP_PASS in .env');
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

app.post('/api/mail', async (req, res) => {
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
    // eslint-disable-next-line no-console
    console.error('[mail] send error', err);
    res.status(500).json({ ok: false, error: 'Failed to send' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[mail] server listening on http://localhost:${PORT}`);
});


