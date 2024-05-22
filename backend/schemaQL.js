const typeDefs = `#graphql
    type Query {
        users: [User]
        quotes: [Quote]
        user(_id: ID!): User
        quote(by: ID!): Quote
        login(credentials: LoginInput!): UserAuthResponse
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
    }

    type UserAuthResponse {
        user: User
        token: String
    }

    type Quote {
        by: ID!
        content: String!
    }
`;

export default typeDefs;
