"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.Category = new mongoose_1.default.Schema({
    name: String
});
exports.Categories = mongoose_1.default.model('Categories', exports.Category);
