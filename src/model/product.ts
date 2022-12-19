import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
    name: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
    onSale: boolean;
    categoryId: string | null
}

export const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    image: String,
    onSale: Boolean,
    categoryId: String
});

export const Products = mongoose.model<IProduct>('Products', ProductSchema)