import QuoteModel from '../model/quoteModel.js'
import UserModel from '../model/userModel.js';


export const addQuote = async (_, args, context) => {
    const user = await UserModel.findById(context.id);
    
    if (!user){
        throw new Error("Given token is invalid");
    }

    const quote = await QuoteModel.create({
        quote: args.quoteString,
        by: user.email
    })

    return {
        by: user.email,
        content: args.quoteString,
        _id: quote._id
    }
};


export const showAllQuote = async (_, args) =>{
    const quotes = await QuoteModel.find().sort({
        createdAt: -1
    })

    return quotes.map(quot=>{
        return {
            by: quot.by,
            content: quot.quote,
            _id: quot.id
        }
    })
}


export const quoteOfUser = async (_, args) => {
    const quotes = await QuoteModel.aggregate([
      {
        $match: { by: args.by } // Match quotes where 'by' field matches the argument
      },
      {
        $project: { 
          by: 1,
          quote: 1,
          _id: 1
        }
      }
    ]);
  
    return quotes.map(quot=>{
        return {
            by: quot.by,
            content: quot.quote,
            _id: quot._id
        }
    })
  };
  

export const updateQuoteRes = async (_, args, context) =>{
    if (!context.id){
        throw new Error('No token is present');
    }

    const user = await UserModel.findById(context.id);

    if (!user){
        throw new Error('Couldnt find the user with this token');
    }

    const quoteOld = await QuoteModel.findById(args.updateQuote._id)
    if (user.email !== quoteOld.by || user.role === 'admin'){
        throw new Error('You are not authorized to update');
    }

    const updatedQuote = await QuoteModel.findByIdAndUpdate(args.updateQuote._id, {quote: args.updateQuote.content}, {
        new: true,
        runValidators: true
    })

    console.log(args);

    return {
        by: updatedQuote.by,
        content: updatedQuote.quote,
        _id: updatedQuote._id
    }
}


export const deleteQuoteRes = async (_, args, context) => {
    if (!context.id) {
        throw new Error('No token is present');
    }

    const user = await UserModel.findById(context.id);

    if (!user) {
        throw new Error('Couldn\'t find the user with this token');
    }

    const quoteOld = await QuoteModel.findById(args._id);

    if (!quoteOld) {
        throw new Error('Quote not found');
    }

    if (user.email !== quoteOld.by && user.role !== 'admin') {
        throw new Error('You are not authorized to delete this quote');
    }

    await QuoteModel.findByIdAndDelete(args._id);

    return {
        status: true,
        message: 'Quote deleted successfully'
    };
};
