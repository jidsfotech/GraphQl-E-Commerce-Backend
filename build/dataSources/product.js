"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
class Products extends apollo_datasource_mongodb_1.MongoDataSource {
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.model.find({ _id: id.id });
            return product[0];
        });
    }
    ;
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find();
        });
    }
    ;
    createProduct($product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create($product);
        });
    }
    ;
    updateProduct() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
    deleteProduct() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    ;
}
exports.default = Products;
