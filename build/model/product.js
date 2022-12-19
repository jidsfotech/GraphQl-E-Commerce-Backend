"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.ProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProductSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    quantity: Number,
    price: Number,
    image: String,
    onSale: Boolean,
    categoryId: String
});
exports.Products = mongoose_1.default.model('Products', exports.ProductSchema);
