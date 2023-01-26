import { ObjectId } from 'mongodb';
import Auth from './utils/auth';
let auth = new Auth();

export const resolvers = {
    Query: {
        product: async (_parent: any, id: ObjectId, { dataSources: { products } }: any) => {
            try {
                return await products.getProduct(id);
            } catch (error) {
                console.log('Error occurred while fetching a product', error)
                throw new Error('Error occurred while fetching a product')
            }
        },

        products: async (_parent: any, args: any, { dataSources: { products } }: any) => {
            try {
                return await products.getProducts();
            } catch (error) {
                console.log('Error occurred while fetching products', error);
                throw new Error('Error occurred while fetching products');
            }
        },

        category: async (_parent: any, id: string, { dataSources: { categories } }: any) => {
            try {
                return await categories.getCategory(id);
            } catch (error) {
                console.log('Error occurred while fetching category', error);
                throw new Error('Error occurred while fetching category');
            }
        },

        categories: async (_parent: any, args: any, { dataSources: { categories } }: any) => {
            try {
                return await categories.getCategories();
            } catch (error) {
                console.log('Error occurred while fetching categories', error);
                throw new Error('Error occurred while fetching categories');
            }
        },

        user: async (_parent: any, args: any, { dataSources: { user } }: any) => {
            try {
                return await user.getUserById(args.userId);
            } catch (error) {
                console.log('Error occurred while fetching user', error)
                throw new Error('Error occurred while fetching user');
            }
        },

        users: async (_parent: any, args: any, { dataSources: { user } }: any) => {
            try {
                return await user.getUsers();
            } catch (error) {
                console.log('Error occurred while fetching users', error)
                throw new Error('Error occurred while fetching users');
            }
        }
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
            try {
                return await products.createProduct(args.product);
            } catch (error) {
                console.log('Error occurred while creating product', error)
                throw new Error('Error occurred while creating product');
            }
        },

        createCategory: async (_parent: any, args: any, { dataSources: { categories } }: any) => {
            try {
                return await categories.createCategory(args.category);
            } catch (error) {
                console.log('Error occurred while creating categories', error)
                throw new Error('Error occurred while creating categories');
            }
        },

        createUser: async (_parent: any, args: any, { dataSources: { user } }: any) => {
            try {
                const data = args.userData
                let $user = await user.getUser({ email: data.email });
                if ($user.length !== 0) {
                    throw new Error('email already exist');
                }
                $user = await user.createUser(data);
                console.log('User created successfully', $user.toString());
                return $user;
            } catch (error) {
                console.log('error occured while creating a user', error)
                throw new Error('Error occured while creating a user')
            }
        },

        login: async (_parent: any, args: any, { dataSources: { user } }: any) => {
            try {
                const email = args.authInfo.email;
                const $user = await user.getUser({ email: email });
                const password = args.authInfo.password;
                const hashedPassword = $user[0]!.password;
                const isMatch = await auth.comparePassword(password, hashedPassword);
                const token = await auth.getToken($user[0]);
                if (isMatch) {
                    return { message: 'login successfull', token: token };
                }
                return { message: 'login failed' };
            } catch (error) {
                console.log('error occured during login', error);
                throw new Error('Error occured during user login');
            };
        }
    }

}