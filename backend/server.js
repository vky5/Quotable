import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { validateJWT } from "./utils/validateJWT.js";
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
    typeDefs,
    resolvers
  });


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context : async ({ req }) => {
    try {
      const { id } = await validateJWT({ req });
      return { id }; // Replace 'user' with your property name
    } catch (error) {
      console.error("Error validating JWT:", error);
      return {};
    }}
});

console.log(`🚀: Server ready at: ${url}`);
