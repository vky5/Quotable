import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";

dotenv.config({path: "./config.env"});
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log('DB connected successfully');
}).catch(err=>{
    console.log('DB connected to fail: '+ err)
})

import typeDefs from "./schemaQL.js";
import resolver from "./resolver.js";
import mongoose from "mongoose";

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver
})

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}

});

console.log(`🚀: Server ready at: ${url}`);