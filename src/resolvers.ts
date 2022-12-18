import { ObjectId } from "mongodb";
export const resolvers = {
    Query: {
        product: async (_parent: any, id: ObjectId, { dataSources: { products } }: any) => {
            return await products.getProduct(id);
        },

        products: async (_parent: any, args: any, { dataSources: { products } }: any) => {
            return await products.getProducts();
        },

        category: async (_parent: any, id: string, { dataSources: { categories } }: any) => {
            return await categories.getCategory(id);
        },

        categories: async (_parent: any, args: any, { dataSources: { categories } }: any) => {
            return await categories.getCategories();
        },
    },

    Product: {
        category: async (_parent: any, id: ObjectId, { dataSources: { categories } }: any) => {
            return await categories.getCategory(id);
        }
    },

    Category: {
        products: async (_parent: any, id: ObjectId, { dataSources: { products } }: any) => {
            return await products.getProducts();
        }
    },

    Mutation: {
        createProduct: async (_parent: any, args: any, { dataSources: { products } }: any) => {
            return await products.createProduct(args.product);
        },

        createCategory: async (_parent: any, args: any, { dataSources: { categories } }: any) => {
            return await categories.createCategory(args.category);
        }
    }
}