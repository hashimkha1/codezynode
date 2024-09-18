const express = require('express');
const router = express.Router()

const {Service} = require('../../models/main/service');

router.get('/services',async(req,res)=>{
    const user = await Service.find();
    res.json(user);
    })
module.exports = router 