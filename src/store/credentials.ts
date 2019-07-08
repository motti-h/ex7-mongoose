import mongodb from 'mongodb';
import { Credential } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class CredentialsStore {
  private collection: DbEntityCollection<Credential>;

  constructor(
    db: mongodb.Db,
  ) {
    this.collection = new DbEntityCollection(db.collection<Credential>('credentials'));
  }

  public all(stripObjectId = true): Promise<Credential[]> {
    return this.collection.all(stripObjectId);
  }

  public findById(id: string | mongodb.ObjectID): Promise<Credential | null> {
    return this.collection.findById(id, true);
  }

  public findByCred(email: string, password: string): Promise<Credential | null> {
    return this.collection.findOne({email, password}, true);
  }

  public add(creds: Array<OptionalId<Credential>>): Promise<void> {
    return this.collection.add(creds);
  }

  public deleteById(id: string | mongodb.ObjectID): Promise<mongodb.DeleteWriteOpResultObject> {
    return this.collection.deleteById(id);
  }

  public replace(cred: Credential, upsert = false): Promise<boolean> {
    return this.collection.replace(cred, upsert);
  }
}

export default CredentialsStore;
