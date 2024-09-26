import express from 'express';
import { Services } from '../../models/main/service.js';

const router = express.Router();

router.get('/services', async (req, res) => {
  const user = await Services.find();
  res.json(user);
});

export default router;
