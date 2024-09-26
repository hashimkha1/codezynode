
import mongoose from 'mongoose';

const descriptionsSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        required: true, 
    },
    description: {
        type: String,
        required: true,   // Fixed 'require' to 'required's
    },
   
})

const Description = mongoose.model('description',descriptionsSchema)

export  {Description}