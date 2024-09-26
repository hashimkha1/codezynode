import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
    },
    image: {
        type: String,  // Store the image path as a string
        required: true  // Make it required if necessary
    },
    Skills:{
        type: String,  // Store the image path as a string
        required: true   
    },
    link: {
        type: String,
        minlength: 4,
        maxlength: 255,
        required: true,   // Fixed 'require' to 'required'
    }
});

const Projects = mongoose.model('projects', projectSchema);
export { Projects };
