// services/emailService.js
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service (e.g., Yahoo, Outlook)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Email options npm install nodemailer
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to,
    subject,
    text,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;

