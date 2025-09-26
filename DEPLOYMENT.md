# Vercel Deployment Guide

## Environment Variables

Set these environment variables in your Vercel dashboard:

```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
MAIL_TO=your-email@gmail.com
```

## Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `SMTP_PASS`

## Local Development

For local development with the contact form:

1. Create a `.env` file in the root directory with the environment variables above:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   MAIL_TO=your-email@gmail.com
   ```
2. Run the development server with API: `npm run dev:all`
3. This will start both the Vite dev server (port 8080+) and the Express API server (port 3001)
4. The contact form will now work properly in development

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Build Configuration

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 18.x (for API functions)

## Troubleshooting

- **Proxy Error**: If you see proxy errors in development, make sure to run `npm run dev:all` to start both the frontend and backend servers
- **Contact Form**: The contact form will work in production (Vercel) and in local development when both servers are running
