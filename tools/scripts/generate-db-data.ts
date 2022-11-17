import { faker } from '@faker-js/faker';
import * as mongodb from 'mongodb';
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
  const { db, client } = await dbSetup();
  console.info('Opened MongoDB connection');

  const productsCollection = db.collection<mongodb.WithoutId<ProductDocument>>(
    Collection.Products
  );
  const reviewsCollection = db.collection<mongodb.WithoutId<ReviewDocument>>(
    Collection.Reviews
  );
  const locationsCollection = db.collection<
    mongodb.WithoutId<LocationDocument>
  >(Collection.Locations);

  const products = Array.from({ length: 275 }).map(createRandomProduct);
  const reviews = Array.from({ length: 2000 }).map(createRandomReview);
  const locations = Array.from({ length: 1000 }).map(createRandomLocation);
  console.info('Generated random data');

  await productsCollection.insertMany(products);
  console.info(
    `Inserted ${products.length} documents into products collection`
  );

  await reviewsCollection.insertMany(reviews);
  console.info(`Inserted ${reviews.length} documents into reviews collection`);

  await locationsCollection.insertMany(locations);
  console.info(
    `Inserted ${locations.length} documents into locations collection`
  );

  await client.close();
  console.info('Closed MongoDB connection');
}

function createRandomProduct(): mongodb.WithoutId<ProductDocument> {
  return {
    name: faker.commerce.productName(),
    imageUrl: faker.image.fashion(),
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
        avatarUrl: faker.image.avatar(),
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
