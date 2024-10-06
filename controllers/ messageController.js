// controllers/messageController.js
import Message from '../models/main/Message.js';
import {
  sendEmailNotification,
  sendWhatsAppNotification
} from '../services/notificationService.js';
import { generateBotResponse } from '../utils/openaiClient.js';
import twilio from 'twilio';

export const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Initialize user choice
    socket.userChoice = null;

    // Listen for user choice from the frontend
    socket.on('userChoice', (choice) => {
      socket.userChoice = choice.toLowerCase(); // Set the user choice to 'human' or 'bot'
      console.log(`User choice set to: ${socket.userChoice}`);
    });

    socket.on('sendMessage', async (data) => {
      const { message } = data;

      // Save user message to MongoDB
      const userMessage = new Message({ sender: 'User', message });
      await userMessage.save();

      // Check if the user has already made a choice
      if (!socket.userChoice) {
        // First interaction - Prompt user to choose between human or bot
        if (message.toLowerCase() === 'human' || message.toLowerCase() === 'bot') {
          socket.userChoice = message.toLowerCase();

          if (socket.userChoice === 'human') {
            socket.emit('receiveMessage', {
              sender: 'System',
              message: 'Connecting you to a human agent...'
            });

            // Notify admin
            sendWhatsAppNotification('A user wants to talk to a human.');
          } else if (socket.userChoice === 'bot') {
            socket.emit('receiveMessage', {
              sender: 'System',
              message: 'You are now chatting with the bot.'
            });

            // Generate bot response
            generateBotResponse(socket, message);
          }
        } else {
          // Prompt user to choose
          socket.emit('receiveMessage', {
            sender: 'System',
            message: 'Would you like to talk to a Human or Bot?'
          });
        }
      } else {
        // User has made a choice
        if (socket.userChoice === 'human') {
          // Forward message to admin
          sendEmailNotification(message);
          sendWhatsAppNotification(message);

          socket.emit('receiveMessage', {
            sender: 'System',
            message: 'Your message has been sent to the admin.'
          });
        } else if (socket.userChoice === 'bot') {
          // Generate bot response
          generateBotResponse(socket, message);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

// WhatsApp webhook controller
export const receiveWhatsAppWebhook = (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  // Extract message body and sender's number from the webhook payload
  const messageBody = req.body.Body;
  const fromNumber = req.body.From;

  console.log('Message Body:', messageBody);
  console.log('From Number:', fromNumber);

  // Verify that the message is from the admin (replace with your admin's WhatsApp number)
  if (fromNumber === 'whatsapp:+923166815673') {
    const io = req.app.get('socketio');
    
    // Emit the admin's message back to the user via socket.io
    io.emit('receiveMessage', { sender: 'Admin', message: messageBody });

    // Optionally save the message to your database (MongoDB example)
    const adminMessage = new Message({
      sender: 'Admin',
      message: messageBody,
    });
    adminMessage.save()
      .then(() => console.log('Admin message saved to database'))
      .catch((err) => console.error('Error saving message:', err));
  }

  // Send an empty TwiML response to acknowledge receipt of the webhook
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};