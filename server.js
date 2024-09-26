import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import signup from './routes/accounts/registration.js';
import project from './routes/main/projects.js';
import description from './routes/main/description.js'
import login from './routes/accounts/login.js';
import services from './routes/main/services.js';
import config from 'config';
import cors from 'cors';
import adminRoutes from './routes/admin/adminRoutes.js';

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

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
app.use('/api', signup);
app.use('/api', login);
app.use('/api', services);
app.use('/api',project);
app.use('/api',description);
app.use('/admin', adminRoutes);



// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
