import mongoose, { Mongoose } from "mongoose";
import UserModel from "./userModel";

const quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        // required: true a person can create account
    },

    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    }
})

const QuoteModel = mongoose.model('QuoteModel', quoteSchema)
export default QuoteModel;