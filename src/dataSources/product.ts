import { MongoDataSource } from 'apollo-datasource-mongodb';
import { IProduct } from '../model/product';
import { ObjectId } from 'mongodb';

export default class Products extends MongoDataSource<IProduct>{
    async getProduct(id: ObjectId) {
        const product = await this.model.find({ _id: id.id });
        return product[0];
    };

    async getProducts() {
        return await this.model.find();
    };

    async createProduct($product: IProduct) {
        return await this.model.create($product);
    };

    async updateProduct() { };

    async deleteProduct() { };
}