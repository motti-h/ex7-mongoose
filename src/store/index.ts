import { Product, Category, User, UserCredential, UserRole } from '../models';
import request from 'request-promise';
//import products from './products.json';
//import categories from './categories.json';
//import users from './users.json';

let products: Product[] = [];
let categories: Category[] = [];
let users: User[] = [];
let credentials: UserCredential[] = []
interface Store {
  products: Product[];
  categories: Category[];
  users: User[];
  credentials: UserCredential[];
}

let store: Store = {
  products,
  categories,
  users,
  credentials: [],
};

export {store};
