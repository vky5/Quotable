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
        content: args.quoteString
    }
};


export const showAllQuote = async (_, args) =>{
    const quotes = await QuoteModel.find().sort({
        createdAt: -1
    })

    return quotes.map(quot=>{
        return {
            by: quot.by,
            content: quot.quote
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
          quote: 1
        }
      }
    ]);
  
    return quotes.map(quot=>{
        return {
            by: quot.by,
            content: quot.quote
        }
    })
  };
  