import mongodb, { FilterQuery } from 'mongodb';
import { OptionalId } from './types';

export interface DbEntity {
  id: string;
}

export class DbEntityCollection<T extends DbEntity> {
  constructor(
    private readonly collection: mongodb.Collection,
  ) { }

  public async all(stripObjectId = true): Promise<T[]> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.find({}, {projection}).toArray();
  }

  public async findById(id: string | mongodb.ObjectID, stripObjectId = true): Promise<T | null> {
    const documentId = new mongodb.ObjectID(id);
    return await this.findOne({_id: documentId}, stripObjectId);
  }

  public async findOne(filter: FilterQuery<T>, stripObjectId = true): Promise<T | null> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.findOne(filter, {projection});
  }

  public async find(filter: FilterQuery<T> | Partial<T>, stripObjectId = true): Promise<any> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.find(filter).toArray();
  }

  public async add(entities: Array<OptionalId<T>>): Promise<void> {
    const newEntities = entities.map(p => {
      const id = new mongodb.ObjectID();
      p.id = id.toHexString();
      return Object.assign({}, p, {
        _id: id,
      }) as T & {_id: mongodb.ObjectID};
    });

    await this.collection.insertMany(newEntities);
  }

  public async deleteById(id: string | mongodb.ObjectID): Promise<mongodb.DeleteWriteOpResultObject> {
    const documentId = new mongodb.ObjectID(id);
    const result = await this.collection.deleteOne({_id: documentId});
    return result;
  }

  public async replace(entity: T, upsert = false): Promise<boolean> {
    const documentId = new mongodb.ObjectID(entity.id);
    const result = await this.collection.replaceOne(
      {_id: documentId},
      entity,
      { upsert },
    );

    return !!(result.modifiedCount + result.upsertedCount);
  }
}
