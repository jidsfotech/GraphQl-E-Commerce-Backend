import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import mongoose from 'mongoose';
import { db } from './db/db';
import { config } from './config';

const startServer = async () => {

  const app = express()
  const httpServer = createServer(app)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/api'
  })
  
  mongoose.connect(config.db_uri!)
    .then(() => {
      console.log('Connected to databse successfully...')
    })
    .catch((error) => {
      console.log('failed to connect to database...', error)
    })

  httpServer.listen({ port: config.port || 9000 }, () =>
    console.log(`Server listening on localhost:9000${apolloServer.graphqlPath}`)
  )
}

startServer();