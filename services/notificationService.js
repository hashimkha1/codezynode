// services/notificationService.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );
const accountSid = "AC1e745746c6a7c1cadd765f62f628634e";
const authToken = "b3fd449163ded27055d4b49beafdd811";
const twilioClient = twilio(accountSid, authToken);

// Email Notification Function
export const sendEmailNotification = (message) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Chatbot Message',
    text: `You have a new message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email Error: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// WhatsApp Notification Function
export const sendWhatsAppNotification = (message) => {
  twilioClient.messages
    .create({
      from: 'whatsapp:' +14155238886,
      to: 'whatsapp:' +923166815673,
      body: `You have a new message: ${message}`,
    })
    .then((msg) => console.log('WhatsApp message sent: ' + msg.sid))
    .catch((error) => console.log('WhatsApp Error: ', error));
};
