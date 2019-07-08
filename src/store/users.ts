import mongodb from 'mongodb';
import { User } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class UsersStore {
  private collection: DbEntityCollection<User>;

  constructor(
    db: mongodb.Db,
  ) {
    this.collection = new DbEntityCollection(db.collection<User>('users'));
  }

  public all(stripObjectId = true): Promise<User[]> {
    return this.collection.all(stripObjectId);
  }

  public findById(id: string | mongodb.ObjectID, stripObjectId = true): Promise<User | null> {
    return this.collection.findById(id, stripObjectId);
  }

  public add(users: Array<OptionalId<User>>): Promise<void> {
    return this.collection.add(users);
  }

  public deleteById(id: string | mongodb.ObjectID): Promise<mongodb.DeleteWriteOpResultObject> {
    return this.collection.deleteById(id);
  }

  public replace(user: User, upsert = false): Promise<boolean> {
    return this.collection.replace(user, upsert);
  }
}

export default UsersStore;
