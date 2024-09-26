import express from 'express';
import { Description } from '../../models/main/descriptions.js';
const router = express.Router();

router.get('/description',async(req,res)=>{
    const descriptions = await Description.find()
    if (descriptions){
        res.status(200).json(descriptions)
    } else {
        res.send('no desciption available')
    }
    
})
export default router;