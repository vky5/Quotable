const typeDefs = `#graphql
    type Query {
        users: [User]
        quotes: [Quote]
        user(_id:ID!): User
        quote(by: ID!): Quote
        # login(by: Login!): UserAuthResponse
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
        signup(userNew: UserInput!
            # firstName: String!,
            # lastName: String,
            # email: String!,
            # password: String!
        ): UserAuthResponse
    }

    type UserAuthResponse {
        user: User
        token: String
    }

    type Login {
        email: String!
        password: String!
    }

    type Quote {
        by: ID!
        content: String!
    }
`;

export default typeDefs;
