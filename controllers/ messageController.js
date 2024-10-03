// controllers/messageController.js
import Message from '../models/main/Message.js';
import {
  sendEmailNotification,
 
} from '../services/notificationService.js';
import { generateBotResponse } from '../utils/openaiClient.js';
import twilio from 'twilio';

export const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Initialize user choice
    socket.userChoice = null;

    socket.on('sendMessage', async (data) => {
      const { message } = data;

      // Save user message to MongoDB
      const userMessage = new Message({ sender: 'User', message });
      await userMessage.save();

      // Check if the user has already made a choice
      if (!socket.userChoice) {
        // First interaction
        if (
          message.toLowerCase() === 'human' ||
          message.toLowerCase() === 'bot'
        ) {
          socket.userChoice = message.toLowerCase();

          if (socket.userChoice === 'human') {
            socket.emit('receiveMessage', {
              sender: 'System',
              message: 'Connecting you to a human agent...',
            });

            // Notify admin
            sendEmailNotification(message);
            sendWhatsAppNotification(message);
          } else {
            socket.emit('receiveMessage', {
              sender: 'System',
              message: 'You are now chatting with the bot.',
            });

            // Generate bot response
            generateBotResponse(socket, message);
          }
        } else {
          // Prompt user to choose
          socket.emit('receiveMessage', {
            sender: 'System',
            message: 'Would you like to talk to a Human or Bot?',
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
            message: 'Your message has been sent to the admin.',
          });
        } else {
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
// export const receiveWhatsAppWebhook = (req, res) => {
//   const twiml = new twilio.twiml.MessagingResponse();
//   const messageBody = req.body.Body;
//   const fromNumber = req.body.From;

//   // Verify that the message is from the admin
//   if (fromNumber === 'whatsapp:' + process.env.ADMIN_WHATSAPP_NUMBER) {
//     const io = req.app.get('socketio');
//     // Send the admin's message back to the user via socket.io
//     io.emit('receiveMessage', { sender: 'Admin', message: messageBody });

//     // Save admin's message to MongoDB
//     const adminMessage = new Message({
//       sender: 'Admin',
//       message: messageBody,
//     });
//     adminMessage.save();
//   }

//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// };
