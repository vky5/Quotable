import {quotes, users} from './_db.js'
import { getUsers, addUserRes,loginRes, getUser } from './resolver/userResolver.js'
import { addQuote, deleteQuoteRes, quoteOfUser, showAllQuote,  updateQuoteRes } from './resolver/quoteResolver.js'


const resolvers = {
    Query: {
        users: getUsers, // this takes a function and here we are returning the user 
        quotes: showAllQuote,
        user: getUser,
        quote: quoteOfUser
    },

    User: {
        quotes: (user)=>{ // this quote will entrypoint will recieve individual user
            return quotes.filter(quote=>{
                return quote.by==user._id
            }
            )
        }
    },

    // just writing notation to change anything in db wont change the state of the db it will only reflect that change in that particular instance 
    // to update the change in db we need to write the crud operation from ourself.
    Mutation: {
        signup: addUserRes,
        login: loginRes,
        createQuote: addQuote,
        updateQuote: updateQuoteRes, // should be same name as mutation of schemaQL 
        deleteQuote: deleteQuoteRes
    }
    
}

export default resolvers