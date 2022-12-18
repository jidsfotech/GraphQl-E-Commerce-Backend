import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    db_uri: process.env.MONGODB_URI,
    port: process.env.PORT
}