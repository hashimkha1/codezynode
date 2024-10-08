import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    iconName:{
        type:String,
        required:false
       },
    title: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,   // Fixed 'require' to 'required'
        unique: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true,   // Fixed 'require' to 'required'
        unique: true
    },
    link: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,   // Fixed 'require' to 'required'
    }
});

const Services = mongoose.model('Services', serviceSchema);
export { Services };
