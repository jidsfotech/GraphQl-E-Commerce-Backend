import dotenv from 'dotenv';
dotenv.config();
import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from './src/schema';
import { resolvers } from './src/resolvers';
import mongoose, { Model, Schema } from 'mongoose';
import { config } from './src/config/config';
import dataSources from "./src/dataSources";
import * as database from './src/model/dataBase';
import Auth from './src/utils/auth';
let auth = new Auth();

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/ec'
  });

  // connect to database
  database.connect()

  httpServer.listen({ port: config.port }, () =>
    console.log(`Server up and running on port: ${config.port}`)
  );
}

startServer();