import { gql } from "apollo-server-express";
export const typeDefs = gql`
    # Schema
    type Query {
      products: [Product!]!
      categories: [Category!]!
    }

    type Product{
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        category: Category
    }

    type Category{
        id: ID!
        name: String!
        products: [Product!]!
    }
    `