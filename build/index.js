"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const product_1 = __importDefault(require("./dataSources/product"));
const product_2 = require("./model/product");
const category_1 = __importDefault(require("./dataSources/category"));
const category_2 = require("./model/category");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const httpServer = http_1.createServer(app);
    const dataSources = () => ({
        products: new product_1.default(product_2.Products),
        categories: new category_1.default(category_2.Categories)
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        dataSources
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path: '/ec'
    });
    mongoose_1.default.connect(config_1.config.db_uri)
        .then(() => {
        console.log('Connected to databse successfully...');
    })
        .catch((error) => {
        console.log('failed to connect to database...', error);
    });
    httpServer.listen({ port: config_1.config.port }, () => console.log(`Server up and running on port: ${config_1.config.port}`));
});
startServer();
