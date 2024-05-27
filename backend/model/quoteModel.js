import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,  // Ensure a quote is required if that's the intended functionality
    },
    by: {
        type: String,
        ref: 'UserModel',  // Use the model name as a string
        required: true
    },
    createdAt: {
        type: Date,
        default: ()=>{
            return new Date()
        }
    }

});

const QuoteModel = mongoose.model('QuoteModel', quoteSchema);
export default QuoteModel;
