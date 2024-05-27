const typeDefs = `#graphql

    type Query {
        users: [User]
        quotes: [Quote]
        user(_id: ID!): User
        quote(by: String!): [Quote]
        
    }

    input UpdateQuoteInput {
        _id: ID!
        content: String 
    }

    type User {
        _id: ID!
        firstName: String!
        lastName: String
        email: String!
        quotes: [Quote]
    }

    input UserInput {
        firstName: String!
        lastName: String
        email: String!
        password: String!
    }

    input LoginInput { #to define an input type input keyword is must
        email: String!
        password: String!
    }

    type Mutation {
        signup(userNew: UserInput!): UserAuthResponse
        login(credentials: LoginInput!): Token
        createQuote(quoteString: String) : Quote
        updateQuote(updateQuote: UpdateQuoteInput!): Quote
        deleteQuote(_id: ID!): DeleteResponse
    }

    type DeleteResponse {
        status: Boolean!
        message: String!
    }

    type UserAuthResponse {
        user: User
        token: String
    }

    type Token{
        token: String
    }

    type Quote {
        by: String
        content: String
        _id: ID!
    }
`;

export default typeDefs;
