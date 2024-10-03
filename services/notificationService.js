// services/notificationService.js
import nodemailer from 'nodemailer';
import twilio from 'twilio';

// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

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

// // WhatsApp Notification Function
// export const sendWhatsAppNotification = (message) => {
//   twilioClient.messages
//     .create({
//       from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
//       to: 'whatsapp:' + process.env.ADMIN_WHATSAPP_NUMBER,
//       body: `You have a new message: ${message}`,
//     })
//     .then((msg) => console.log('WhatsApp message sent: ' + msg.sid))
//     .catch((error) => console.log('WhatsApp Error: ', error));
// };
