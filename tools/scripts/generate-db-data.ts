import { faker } from '@faker-js/faker';
import * as mongodb from 'mongodb';
import prompt from 'prompt';
import {
  Collection,
  dbSetup,
  LocationDocument,
  ProductDocument,
  ReviewDocument,
} from '../../apps/server/src/app/db';

require('dotenv').config();

generateDatabaseData();

async function generateDatabaseData(): Promise<void> {
  const { productsCount, reviewsCount, locationsCount } =
    await getCountsFromStdin();

  const { db, client } = await dbSetup();
  console.info('\nOpened MongoDB connection');

  const productsCollection = db.collection<mongodb.WithoutId<ProductDocument>>(
    Collection.Products
  );
  const reviewsCollection = db.collection<mongodb.WithoutId<ReviewDocument>>(
    Collection.Reviews
  );
  const locationsCollection = db.collection<
    mongodb.WithoutId<LocationDocument>
  >(Collection.Locations);

  await fillCollection(productsCollection, productsCount, createRandomProduct);

  await fillCollection(reviewsCollection, reviewsCount, createRandomReview);

  await fillCollection(
    locationsCollection,
    locationsCount,
    createRandomLocation
  );

  await client.close();
  console.info('Closed MongoDB connection');
}

function createRandomProduct(): mongodb.WithoutId<ProductDocument> {
  return {
    name: faker.commerce.productName(),
    imageUrl: `${faker.image.avatar()}?random=${Math.random()}`,
    price: Number(faker.commerce.price()),
    ...(Math.random() > 0.1 && {
      rating: Number(faker.finance.amount(1, 5, 2)),
    }),
  };
}

function createRandomReview(): mongodb.WithoutId<ReviewDocument> {
  return {
    dateTime: faker.date.recent(100).toISOString(),
    text: faker.lorem.sentences(),
    rating: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    ...(Math.random() > 0.2 && {
      author: {
        name: faker.name.fullName(),
        avatarUrl: `${faker.image.avatar()}?random=${Math.random()}`,
      },
    }),
  };
}

function createRandomLocation(): mongodb.WithoutId<LocationDocument> {
  return {
    name: `${faker.address.city()} - ${faker.address.street()}`,
    address: faker.address.streetAddress(true),
    price: Number(faker.commerce.price(0, 10)),
    delivery: faker.helpers.arrayElement([
      { days: 1, time: 8 },
      { days: 1, time: 15 },
      { days: 1, time: 20 },
      { days: 2, time: 10 },
      { days: 3, time: 10 },
    ]),
  };
}

async function getCountsFromStdin(): Promise<{
  productsCount: number;
  reviewsCount: number;
  locationsCount: number;
}> {
  const pattern = /^\d+$/;
  const { products, reviews, locations } = await prompt.get<{
    products: string;
    reviews: string;
    locations: string;
  }>({
    properties: {
      products: {
        description: 'Number of products',
        pattern,
        required: true,
      },
      reviews: {
        description: 'Number of reviews',
        pattern,
        required: true,
      },
      locations: {
        description: 'Number of locations',
        pattern,
        required: true,
      },
    },
  });
  return {
    productsCount: parseInt(products),
    reviewsCount: parseInt(reviews),
    locationsCount: parseInt(locations),
  };
}

async function fillCollection<T extends mongodb.Document>(
  collection: mongodb.Collection<T>,
  count: number,
  createFn: () => mongodb.OptionalUnlessRequiredId<T>
): Promise<void> {
  const prevCount = await collection.estimatedDocumentCount();
  console.info(
    `\n${prevCount.toLocaleString()} documents already in ${
      collection.collectionName
    } collection`
  );

  if (prevCount < count) {
    const docs = Array.from({ length: count - prevCount }).map(createFn);
    console.info(
      `Generated ${docs.length.toLocaleString()} random ${
        collection.collectionName
      }`
    );
    const { insertedCount } = await collection.insertMany(docs);
    const currCount = await collection.estimatedDocumentCount();
    console.info(
      `Inserted ${insertedCount.toLocaleString()} documents into ${
        collection.collectionName
      } collection, now has ${currCount.toLocaleString()} in total\n`
    );
  } else if (prevCount > count) {
    const ids: mongodb.ObjectId[] = await collection
      .find()
      .limit(prevCount - count)
      .map((doc) => doc._id)
      .toArray();
    const { deletedCount } = await collection.deleteMany({
      _id: {
        $in: ids as any,
      },
    });
    const currCount = await collection.estimatedDocumentCount();
    console.info(
      `Deleted ${deletedCount} documents from ${
        collection.collectionName
      } collection, now has ${currCount.toLocaleString()} in total\n`
    );
  } else {
    console.info(
      `Skipping ${collection.collectionName}, already exact amount of documents\n`
    );
  }
}
