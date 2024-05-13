import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./schemaQL.js";
import resolver from "./resolver.js";

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}

});

console.log(`🚀: Server ready at: ${url}`);