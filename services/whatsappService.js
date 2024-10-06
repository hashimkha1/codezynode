// services/whatsappService.js
import { config } from 'dotenv';
import twilio from 'twilio';

config();  // Loads environment variables from .env

 
// TWILIO_ACCOUNT_SID = "AC1e745746c6a7c1cadd765f62f628634e"
// TWILIO_AUTH_TOKEN = "e3f52e26428da35a9acc75f1730aaf63"

const accountSid = 'AC1e745746c6a7c1cadd765f62f628634e';
const authToken = 'b3fd449163ded27055d4b49beafdd811';
const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (message) => {
  try {
    const response = await client.messages.create({
      from:'+14155238886',  // Twilio WhatsApp number
      to: '+923166815673',        // Admin WhatsApp number
      body: message,                             // Message to send
    });
    console.log('Message sent successfully:', response.sid);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
