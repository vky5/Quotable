import {quotes, users} from './_db.js'
import { getUsers, addUserRes,loginRes, getUser, quoteResUser } from './resolver/userResolver.js'
import { addQuote, deleteQuoteRes, quoteOfUser, showAllQuote,  updateQuoteRes } from './resolver/quoteResolver.js'


const resolvers = {
    Query: {
        users: getUsers, // this takes a function and here we are returning the user 
        quotes: showAllQuote,
        user: getUser,
        quote: quoteOfUser
    },

    User: {
        quotes: quoteResUser 
        // this means that we can resolve any field and manipulate the response if we want to. for example if we want all quotes to start and end with % we can create a resolver for content and 
        //return string from here but what will be passed at parents object of the schemca which it is a member of for eample quotes is the property of User in mutation and it i
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

export default resolvers;