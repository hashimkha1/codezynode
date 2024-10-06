import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import signup from './routes/accounts/registration.js';
import project from './routes/main/projects.js';
import description from './routes/main/description.js'
import cors from "cors";
import login from './routes/accounts/login.js';
import services from './routes/main/services.js';
import messages from './routes/main/messageRoutes.js';
import config from 'config';
import adminRoutes from './routes/admin/adminRoutes.js';import { createServer } from 'http';
import { Server } from "socket.io";
import { handleSocketConnection } from './controllers/ messageController.js';
import bodyParser from 'body-parser';

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost/Codezy')
    .then(() => {
        console.log('ok');
    });

// Uncomment if using JWT key configuration
// if (!config.get('jwtKey')) {
//     console.log('error');
//     process.exit(1);
// }

// Routes
const httpServer = createServer(app); // Create HTTP server
// server.js

const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:3000', // Update this if your frontend runs on a different origin
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    },
  });
  

app.set('socketio', io);

// Initialize Socket.io event handlers
handleSocketConnection(io)
app.use('/api', signup);
app.use('/api', login);
app.use('/api', services);
app.use('/api',project);

app.use('/api',messages);
app.use('/api',description);
app.use('/admin', adminRoutes);



// Start the server
httpServer.listen(8000, () => {
    console.log('Server is running on port 8000');
});
