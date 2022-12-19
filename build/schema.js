"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    # Schema

    type Product{
        _id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        category(id:ID!): Category
    }

    input inputProduct{
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
    }

    type Category{
        _id: ID!
        name: String!
        products(id:ID): [Product!]!
    }

    input inputCategory{
        name: String!
    }
    
    type Query {
      product(id:ID): Product
      products: [Product!]!
      category(id:ID): Category
      categories: [Category!]!
    }

    type Mutation {
        createProduct(product:inputProduct): Product!
        createCategory(category:inputCategory): Category!
    }
    `;
