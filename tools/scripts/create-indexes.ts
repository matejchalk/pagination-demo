import * as mongodb from 'mongodb';
import {
  Collection,
  dbSetup,
  ProductDocument,
  ReviewDocument,
} from '../../apps/server/src/app/db';

require('dotenv').config();

createIndexes();

async function createIndexes(): Promise<void> {
  const { db, client } = await dbSetup();
  console.info('Opened MongoDB connection\n');

  const productsCollection = db.collection<mongodb.WithoutId<ProductDocument>>(
    Collection.Products
  );
  const reviewsCollection = db.collection<mongodb.WithoutId<ReviewDocument>>(
    Collection.Reviews
  );

  const productIndexNames = await productsCollection.createIndexes([
    { key: { name: 1 } },
    { key: { price: 1 } },
    { key: { rating: 1 } },
  ]);
  console.info(
    `Created indexes ${productIndexNames.join(', ')} on products collection\n`
  );

  const reviewsIndexName = await reviewsCollection.createIndex({
    dateTime: -1,
  });
  console.info(`Created index ${reviewsIndexName} on reviews collection\n`);

  await client.close();
  console.info('Closed MongoDB connection');
}
