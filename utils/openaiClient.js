// utils/openaiClient.js
import  openai  from 'openai';
import Message from '../models/main/Message.js';

const configuration = new openai({
  apiKey: 'jndjkdjkdjkjkdjkdjkdjk',
});
const openaiData = new openai(configuration);

// Function to generate bot response
export const generateBotResponse = async (socket, message) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    });

    const botMessage = response.data.choices[0].text.trim();

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
