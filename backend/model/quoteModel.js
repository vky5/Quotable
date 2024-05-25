import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,  // Ensure a quote is required if that's the intended functionality
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'  // Use the model name as a string
    }
});

const QuoteModel = mongoose.model('QuoteModel', quoteSchema);
export default QuoteModel;
