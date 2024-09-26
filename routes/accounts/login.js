import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, loginValidator } from '../../models/accounts/user.js';

const app = express();
const router = express.Router();
app.use(express.json());

router.get('/login', async (req, res) => {
  const { error } = loginValidator.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExit = await User.findOne({ email: req.body.email });
  if (!userExit) return res.status(400).send('User with this email does not exist.');

  const validatePassword = await bcrypt.compare(req.body.password, userExit.password);
  if (!validatePassword) return res.status(400).send('Password invalid');

  const token = userExit.generateToken();
  res.send(token);
});

export default router;
