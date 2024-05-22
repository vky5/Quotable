import {quotes, users} from './_db.js'
import { getUsers, addUserRes, getUser } from './resolver/userResolver.js'



const resolver = {
    Query: {
        users: getUsers, // this takes a function and here we are returning the user 
        quotes: ()=> quotes,
        user: getUser,
        quote: (_, {by})=> quotes.find(quote=>quote.by==by)
        // login: 

        
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
        signup: addUserRes
    }
    
}

export default resolver