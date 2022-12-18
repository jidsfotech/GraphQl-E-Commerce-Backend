import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import mongoose, { Model, Schema } from 'mongoose';
import { config } from './config';
import Products from "./dataSources/product";
import { Products as productsModel } from "./model/product";
import Categories from "./dataSources/category";
import { Categories as categoryModel } from "./model/category";

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);

  const dataSources = () => ({
    products: new Products(productsModel),
    categories: new Categories(categoryModel)
  })

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    path: '/api'
  });

  mongoose.connect(config.db_uri!)
    .then(() => {
      console.log('Connected to databse successfully...')
    })
    .catch((error) => {
      console.log('failed to connect to database...', error)
    })

  httpServer.listen({ port: config.port || 9000 }, () =>
    console.log(`Server listening on localhost:9000${apolloServer.graphqlPath}`)
  );
}

startServer();