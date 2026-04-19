import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email Configuration from .env
  const mailConfig = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(mailConfig);

  // API Route: Registration Notification
  app.post('/api/notify-admin', async (req, res) => {
    const { username, email, registrationDate } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'mohamedbenothmane2006@gmail.com';

    console.log(`New user registered: ${username} (${email}) at ${registrationDate}`);

    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"QuizMaster Pro Admin" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          subject: 'New User Registered - QuizMaster Pro',
          text: `A new user has registered:\n\nUsername: ${username}\nEmail: ${email}\nDate: ${registrationDate}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2>New User Registration</h2>
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Registration Date:</strong> ${registrationDate}</p>
            </div>
          `,
        });
        res.json({ success: true, message: 'Admin notified via email' });
      } catch (error) {
        console.error('Email sending failed:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
      }
    } else {
      console.warn('Email config missing, skipping notification email.');
      res.json({ success: true, message: 'Admin notification logged (email skipped due to missing config)' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
