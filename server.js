const express = require('express');
// const usermodel = require('./routes/admin/usermodel')
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));
app.use(express.json()); 
const mongoose = require('mongoose');
const signup = require('./routes/accounts/registration');
const login = require('./routes/accounts/login');
const services =require('./routes/main/services')
const config = require('config');
var cors = require('cors')
app.use(cors())
const adminRoutes = require('./routes/admin/adminRoutes');

mongoose.connect('mongodb://localhost/Codezy')
.then(()=>{
    console.log('ok')
})
// if(!config.get('jwtKey')){
//     console.log('error')
//     process.exit(1)

// }

// Routes for managing the models

app.use('/api',signup)
app.use('/api',login)
app.use('/api',services)
app.use(adminRoutes);
app.listen(8000)