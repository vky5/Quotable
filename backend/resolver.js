import {quotes, users} from './_db.js'

const resolver = {
    Query: {
        users: ()=> users,
        quotes: ()=> quotes
    },

    User: {
        quotes: (user)=>{ // this quote will entrypoint will recieve user
            quotes.filter(quotes=>quotes.by==user.id)
        }
    }
}

export default resolver