// utils/openaiClient.js
import { OpenAI } from 'openai';
import Message from '../models/main/Message.js';

const openai = new OpenAI({
  apiKey: 'sk-S5UEOQWyIzaB91I6pBNfvUH_5auoS3AeEFjSLJzg-oT3BlbkFJBxMuvGVzVyuei-L7G4JOlzGCeQPn6hTa7jzAZremgA',
});
// Function to generate bot response
export const generateBotResponse = async (socket, message) => {
  console.log(message)
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [{ role: 'user', content: message }],
      max_tokens: 150,
    });

    const botMessage = response.choices[0].message.content;

    // Save bot message to MongoDB
    const botReply = new Message({ sender: 'Bot', message: botMessage });
    await botReply.save();

    // Send bot message back to user
    socket.emit('receiveMessage', { sender: 'Bot', message: botMessage });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    socket.emit('receiveMessage', {
      sender: 'System',
      message: 'There was an error processing your request.',
    });
  }
};
