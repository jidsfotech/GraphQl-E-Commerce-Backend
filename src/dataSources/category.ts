import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ICategory } from '../model/category';
import { ObjectId } from 'mongodb'

export default class Categories extends MongoDataSource<ICategory>{
    async getCategory(id: ObjectId) {
        const category = await this.model.find({_id:id.id});
        return category[0];
    }

    async getCategories() {
        return await this.model.find();
    }

    async createCategory($category: ICategory) {
        return await this.model.create($category);
    }
    async updateCategory() { }
}