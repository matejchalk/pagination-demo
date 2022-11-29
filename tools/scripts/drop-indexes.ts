import * as mongodb from 'mongodb';
import {
  Collection,
  dbSetup,
  ProductDocument,
  ReviewDocument,
} from '../../apps/server/src/app/db';

require('dotenv').config();

dropIndexes();

async function dropIndexes(): Promise<void> {
  const { db, client } = await dbSetup();
  console.info('Opened MongoDB connection\n');

  const productsCollection = db.collection<mongodb.WithoutId<ProductDocument>>(
    Collection.Products
  );
  const reviewsCollection = db.collection<mongodb.WithoutId<ReviewDocument>>(
    Collection.Reviews
  );

  await productsCollection.dropIndexes();
  console.info('Dropped indexes on products collection\n');

  await reviewsCollection.dropIndexes();
  console.info('Dropped indexes on reviews collection\n');

  await client.close();
  console.info('Closed MongoDB connection');
}
