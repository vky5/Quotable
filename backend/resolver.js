import {quotes, users} from './_db.js'
import { getUsers, addUserRes } from './resolver/userResolver.js'



const resolver = {
    Query: {
        users: getUsers, // this takes a function and here we are returning the user 
        quotes: ()=> quotes,
        user: (_, args)=>users.find(ur => ur.id==args.id),
        quote: (_, {by})=> quotes.find(quote=>quote.by==by),

        
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
        addUser: addUserRes
    }
    
}

export default resolver