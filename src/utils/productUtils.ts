import {store} from '../store';
import { Product } from '../models';
import {MongoConnection} from './mongo-connection';
import mongodb from 'mongodb';
import products from '../store/products';

//let productsStore = new products()
//const mongoClient = await mongodb.MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

async function getAllProducts():Promise<Product|null> {
  let client = await mongodb.connect('mongodb://localhost:27017/store',{ useNewUrlParser: true });
  //client.db().collection('products').insertOne({ "id": "1" , "categoryId": "3", "name": "teddybar" , "items In Stock": 20 }); 
  const documentId = new mongodb.ObjectID('5d1d9a907cf23f4fac301a28');
  return client.db().collection('products').findOne({_id: documentId});
}

function findProduct(id: number): Product | undefined {
  return store.products.find(p => p.id === id.toString());
}

function getProductsLength(): number {
  return store.products.length;
}

export {
    findProduct,
    getAllProducts,
    getProductsLength,
    Product,
};
