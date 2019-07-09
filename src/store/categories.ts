import mongoose from 'mongoose';
import { Category } from '../models';

const schema = new mongoose.Schema(
  {
    'name': { type: String },
  },
  {
    versionKey: false,
  },
);

export interface DbCategoryModel extends Category, mongoose.Document {
}

// tslint:disable-next-line:variable-name
export const DbCategory: mongoose.Model<DbCategoryModel> =
  mongoose.model<DbCategoryModel>('Category', schema);