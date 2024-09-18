const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {User,loginValidator} = require('../../models/accounts/user');
const router = express.Router()
app.use(express.json()); 

router.get('/login',async(req,res)=>{
    const {error} = loginValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const userExit = await User.findOne({email:req.body.email})
    if (!userExit) return res.status(400).send('user with this email does not exits.')
    const validatePassword = await bcrypt.compare(req.body.password,userExit.password)
    if (!validatePassword) return res.status(400).send('password invalid')
    const token = userExit.generateToken()
    res.send(token)
})
module.exports = router