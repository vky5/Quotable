const typeDefs = `#graphql
    type Query {
        users: [User]
        quotes: [Quote]
        user(_id:ID!): User
        quote(by: ID!): Quote
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

    type Mutation {
        addUser(userNew: UserInput!
            # firstName: String!,
            # lastName: String,
            # email: String!,
            # password: String!
        ): User
    }

    type Quote {
        by: ID!
        content: String!
    }
`;

export default typeDefs;
