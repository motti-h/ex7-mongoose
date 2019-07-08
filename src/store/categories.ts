import mongodb from 'mongodb';
import { Category } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class CategoryStore {
  private collection: DbEntityCollection<Category>;

  constructor(
    db: mongodb.Db,
  ) {
    this.collection = new DbEntityCollection(db.collection<Category>('categories'));
  }

  public all(stripObjectId = true): Promise<Category[]> {
    return this.collection.all(stripObjectId);
  }

  public findById(id: string | mongodb.ObjectID): Promise<Category | null> {
    return this.collection.findById(id, true);
  }

  public findByCred(email: string, password: string): Promise<Category | null> {
    return this.collection.findOne({email, password}, true);
  }

  public add(cats: Array<OptionalId<Category>>): Promise<void> {
    return this.collection.add(cats);
  }

  public deleteById(id: string | mongodb.ObjectID): Promise<mongodb.DeleteWriteOpResultObject> {
    return this.collection.deleteById(id);
  }

  public replace(cred: Category, upsert = false): Promise<boolean> {
    return this.collection.replace(cred, upsert);
  }
}

export default CategoryStore;
