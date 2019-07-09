import mongoose from 'mongoose';
import { Product } from '../models';

const schema = new mongoose.Schema(
  {
    categoryId: { type: String},
    name: { type: String},
    itemsinstock: Number,
  },
  {
    versionKey: false,
  },
);

export interface DbProductModel extends Product, mongoose.Document {
}

// tslint:disable-next-line:variable-name
export const DbProduct: mongoose.Model<DbProductModel> =
  mongoose.model<DbProductModel>('Product', schema);
DbProduct.collection.dropIndexes();
