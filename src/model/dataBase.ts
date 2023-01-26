import * as Mongoose from 'mongoose';
import { config } from '../config/config';


export const connect = async () => {
	const uri: string = config.db_uri;
	await Mongoose.connect(uri)
		.then(() => {
			console.log('Connected to databse successfully...')
		})
		.catch((error) => {
			console.log('failed to connect to database...', error)
		})
};

export const disconnect = () => {
	Mongoose.disconnect();
};
