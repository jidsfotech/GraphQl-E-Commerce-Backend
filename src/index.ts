import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { db } from './db/db';
import {typeDefs} from './schema';
import {resolvers} from './resolvers';

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

  httpServer.listen({ port: process.env.PORT || 9000 }, () =>
    console.log(`Server listening on localhost:9000${apolloServer.graphqlPath}`)
  )
}

startServer()