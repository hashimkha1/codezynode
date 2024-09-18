const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json()); 
const {User} = require('../../models/accounts/user');
router.get('/User', async (req, res) => {
    const models = await User.find();
    res.json(models);
  });
  
  router.post('/User', async (req, res) => {
    const newModel = new User(req.body);
    await newModel.save();
    res.status(201).json(newModel);
  });
  
  router.put('/User/:id', async (req, res) => {
    const updatedModel = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedModel);
  });
  
  router.delete('/User/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  });

  module.exports = router