/*
import mongodb from 'mongodb';
import ProductsStore from './products';
import UsersStore from './users';
import CredentialsStore from './credentials';
import CategoryStore from './categories';

export interface RootStore {
  products: ProductsStore;
  users: UsersStore;
  credentials: CredentialsStore;
  categories: CategoryStore;
}

export default (db: mongodb.Db): RootStore => ({
  products: new ProductsStore(db),
  users: new UsersStore(db),
  credentials: new CredentialsStore(db),
  categories: new CategoryStore(db),
});
*/