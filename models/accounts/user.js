const mongoose = require('mongoose');
const Joi = require('joi')

const userShcema = new mongoose.Schema({
    username:{
        type: String,
        minlength:2,
        maxlength: 25,
        require:true,
        unique:true
    },
    email:{
        type:String,
        minlength:2,
        maxlength: 25,
        require:true,
        unique:true

    },
    password:{
        type:String,
        minlength:4,
        maxlength: 255,
        require:true,
    }
})
userShcema.methods.generateToken = function(){
    var token = jwt.sign({ _id:this._id,username:this.username }, 'kjskjakj');  
    return token
}
const User = mongoose.model('User',userShcema)
const userValidator = Joi.object({
    username: Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
const loginValidator = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
  
exports.User = User;
exports.userValidator = userValidator;
exports.loginValidator = loginValidator;   