import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const startServer = async () => {

  const app = express()
  const httpServer = createServer(app)

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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