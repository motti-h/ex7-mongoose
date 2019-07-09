import mongoose from 'mongoose';
import { User } from '../models';

const schema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    versionKey: false,
  },
);

export interface DbUserModel extends User, mongoose.Document {
  id: string;
}

// tslint:disable-next-line:variable-name
export const DbUser: mongoose.Model<DbUserModel> =
  mongoose.model<DbUserModel>('User', schema);
