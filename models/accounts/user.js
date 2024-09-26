import mongoose from 'mongoose';
import Joi from 'joi';
import jwt from 'jsonwebtoken';  // Assuming jwt is required

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 25,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 25,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 255,
    require: true,
  },
});

userSchema.methods.generateToken = function () {
  var token = jwt.sign(
    { _id: this._id, username: this.username },
    'kjskjakj'
  );
  return token;
};

const User = mongoose.model('User', userSchema);

const userValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const loginValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export { User, userValidator, loginValidator };
