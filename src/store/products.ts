import mongodb from 'mongodb';
import { Product } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class ProductStore {
  private collection: DbEntityCollection<Product>;

  constructor(
    db: mongodb.Db,
  ) {
    this.collection = new DbEntityCollection(db.collection<Product>('products'));
  }

  public all(): Promise<Product[]> {
    return this.collection.all(true);
  }

  public findById(id: string | mongodb.ObjectID): Promise<Product | null> {
    return this.collection.findById(id, true);
  }

  public add(products: Array<OptionalId<Product>>): Promise<void> {
    return this.collection.add(products);
  }

  public deleteById(id: string | mongodb.ObjectID): Promise<mongodb.DeleteWriteOpResultObject> {
    return this.collection.deleteById(id);
  }

  public replace(product: Product, upsert = false): Promise<boolean> {
    return this.collection.replace(product, upsert);
  }

  public find(categoryId: string): Promise<Product[]> {
    return this.collection.find({categoryId});
  }
}

export default ProductStore;
