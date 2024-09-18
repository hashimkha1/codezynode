const mongoose = require('mongoose');

const serviceShcema = new mongoose.Schema({
    title:{
        type: String,
        minlength:2,
        maxlength: 255,
        require:true,
        unique:true
    },
    description:{
        type:String,
        maxlength: 2000,
        require:true,
        unique:true

    },
    link:{
        type:String,
        minlength:4,
        maxlength: 255,
        require:true,
    }
})
const Service = mongoose.model('Services',serviceShcema)
exports.Service = Service