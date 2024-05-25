import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import typeDefs from "./schemaQL.js";
import resolvers from "./resolver.js";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB connected to fail: " + err);
  });

  const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: async ({ req }) => {
    console.log('Hey');
  }
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀: Server ready at: ${url}`);
