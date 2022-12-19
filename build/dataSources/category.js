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
class Categories extends apollo_datasource_mongodb_1.MongoDataSource {
    getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.model.find({ _id: id.id });
            return category[0];
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find();
        });
    }
    createCategory($category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create($category);
        });
    }
    updateCategory() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Categories;
