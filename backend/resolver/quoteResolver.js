import QuoteModel from '../model/quoteModel.js'
import UserModel from '../model/userModel.js';


export const quoteResolver = async (_, args, context) => {
    const user = await UserModel.findById(context.id);
    
    if (!user){
        throw new Error("Given token is invalid");
    }

    const quote = await QuoteModel.create({
        quote: args.quoteString,
        by: context.id
    })

    return {
        by: user.email
    }
};
