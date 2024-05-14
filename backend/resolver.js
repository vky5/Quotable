import {quotes, users} from './_db.js'

const resolver = {
    Query: {
        users: ()=> users, // this takes a function and here we are returning the user 
        quotes: ()=> quotes,
        user: (_, args)=>users.find(ur => ur.id==args.id),
        quote: (_, {by})=> quotes.find(quote=>quote.by==by)
    },

    User: {
        quotes: (user)=>{ // this quote will entrypoint will recieve individual user
            return quotes.filter(quote=>{
                return quote.by==user._id
            }
            )
        }
    }
}

export default resolver