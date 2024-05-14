const typeDefs = `#graphql
    type Query{
        users: [User]
        quotes: [Quote]
        user(_id:ID!): User
        quote(by: ID!): Quote
    }

    type User{
        _id: ID!
        firstName: String!
        lastName: String
        email: String!
        password: String!
        quotes: [Quote]
    }

    type Quote{
        by: ID!
        content: String!
    }


`;

export default typeDefs;