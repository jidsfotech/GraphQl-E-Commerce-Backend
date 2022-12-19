import mongoose, { model } from "mongoose";

export interface ICategory extends mongoose.Document {
    name: string
}

export const Category = new mongoose.Schema({
    name: String
});

export const Categories = mongoose.model<ICategory>('Categories', Category);