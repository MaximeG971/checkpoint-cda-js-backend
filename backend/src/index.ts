import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { dataSource } from "./config/db";
import { startStandaloneServer } from "@apollo/server/standalone";
import CountryResolver from "./resolvers/CountryResolver";
import ContinentResolver from "./resolvers/ContinentResolver";

export default CountryResolver;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
};

start();
