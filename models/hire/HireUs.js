// import mongoose
import mongoose from 'mongoose';

const hireUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Basic email validation
    },
    phone: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: false,
        trim: true
    },
    budget: {
        type: [Number], // Array to hold two values: min and max budget
        validate: {
            validator: function (budget) {
                return budget.length === 2;
            },
            message: 'Budget must have a min and max value'
        }
    },
    selectedServices: {
        type: [String], // Array of selected services
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export the model
export default mongoose.model('client', hireUsSchema);
