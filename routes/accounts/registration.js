const express = require('express');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const app = express();
const morgan = require('morgan');
const {User,userValidator} = require('../../models/accounts/user');
const router = express.Router()

app.use(morgan('tiny'));
app.use(express.json()); 
router.get('/get',async(req,res)=>{
    const user = await User.find();
    res.json(user);
    })
router.post('/signup',async(req,res)=>{
    const {error} = userValidator.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const userExit = await User.findOne({email:req.body.email})
    if (userExit) return res.status(400).send('user with this email already exits.')
    const user = new User(_.pick(req.body,['username','email','password']))
    const salt = await bcrypt.genSalt(11)
    user.password = await bcrypt.hash(user.password,salt)
    const savedUser = await user.save()
    res.status(200)
    .send(_.pick(savedUser,['username','email']))

})
module.exports = router