import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

const mailer = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default mailer;
