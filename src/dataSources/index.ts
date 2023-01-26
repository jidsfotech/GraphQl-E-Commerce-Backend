import User from './user';
import { User as userModel } from '../model/user/user.model';
import Products from './product';
import { Products as productsModel } from '../model/product';
import Categories from './category';
import { Categories as categoriesModel } from '../model/category';

export default () => ({
    user: new User(userModel),
    products: new Products(productsModel),
    categories: new Categories(categoriesModel)
});