import { MongoDataSource } from 'apollo-datasource-mongodb';
import { IUser } from '../model/User/user.type';
import { ObjectId } from 'mongodb';

export default class User extends MongoDataSource<IUser>{

    async getUser(params: { [key: string]: string }) {
        return await this.findByFields(params);
    }

    async getUserById(id: ObjectId) {
        return await this.findOneById(id);
    };

    async getUsers() {
        return await this.model.find();
    };

    async createUser($userData: IUser): Promise<any> {
        return await this.model.create($userData);
    };

    async updateUser() { };

    async deleteUser() { };
}