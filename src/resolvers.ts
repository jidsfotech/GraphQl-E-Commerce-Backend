import { Product, Categories, db } from "./db/db";
export const resolvers = {
    Query: {
        products: (_parent: any, args: any, { db }: CtxArgs) => {
            return db.products;
        },
        categories: (_parent: any, args: any, { db }: CtxArgs) => {
            return db.categories;
        },
    },

    Product: {
        category: ({ categoryId }: { categoryId: string }, _args: any, { db }: CtxArgs) => {
            return db.categories.find((category) => category.id === categoryId)
        }
    },

    Category: {
        products: ({ id: categoryId }: { id: string }, args: any, { db }: CtxArgs) => {
            return db.products.filter((product) => product.categoryId === categoryId)
        }
    }
}

export interface CtxArgs {
    db: {
        products: Product[]
        categories: Categories[]
    }
}