import mongoose from 'mongoose';
import { Credential } from '../models';

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    roles: [String],
  },
  {
    versionKey: false,
  },
);

/*
// Mongoose includes 'id' virtual property already, setting to include that if toJSON is used
schema.set('toJSON', {
  virtuals: true,
});

Can remove _id altogether if needed, e.g.
schema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { delete ret._id }
});
*/

export interface DbCredentialModel extends Credential, mongoose.Document {
  id: string;
}

const queryHelpers = {
  byCred<Q extends mongoose.DocumentQuery<any, DbCredentialModel>>(
    this: Q, email: string, password: string,
  ) {
    return this.where({ email, password });
  },
};

schema.query = queryHelpers;

// tslint:disable-next-line:variable-name
export const DbCredential: mongoose.Model<DbCredentialModel, typeof queryHelpers> =
  mongoose.model<DbCredentialModel, mongoose.Model<DbCredentialModel, typeof queryHelpers>>('Credential', schema);
