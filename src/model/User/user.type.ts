import { Model, Schema, HydratedDocument, model, Document } from 'mongoose';


export interface IUser extends Document{
    email: string,
    password: string,
    name: string,
    loginAttempts: number,
    lockUntil: number,
    isModified(password: string): boolean
}

export interface IUserMethods {
    comparePassword(password: string, cb: any): any;
    incrementLoginAttempts(): Promise<HydratedDocument<IUser>>;
    authenticate(email: string, password: string): any
}


// export type UserModel = Model<IUser, {}, IUserMethods>;

export interface UserModel extends Model<IUser, {}, IUserMethods> {
    //staticMethosd(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
  }

export type updatesLoginAttemptsType = { [key: string]: { [key: string]: number } };
