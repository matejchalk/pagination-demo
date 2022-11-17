import * as mongodb from 'mongodb';

export const DB_NAME = 'eshopdb';

export enum Collection {
  Products = 'products',
  Reviews = 'reviews',
  Locations = 'locations',
}

export type ProductDocument = mongodb.WithId<{
  name: string;
  imageUrl: string;
  price: number;
  rating?: number;
}>;

export type ReviewDocument = mongodb.WithId<{
  dateTime: string;
  text: string;
  rating: number;
  author?: {
    name: string;
    avatarUrl: string;
  };
}>;

export type LocationDocument = mongodb.WithId<{
  name: string;
  address: string;
  delivery: {
    days: number;
    time: number;
  };
  price: number;
}>;

export async function dbSetup(): Promise<{
  client: mongodb.MongoClient;
  db: mongodb.Db;
}> {
  const mongoUri = process.env['MONGODB_URI'];
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  const mongoClient = new mongodb.MongoClient(mongoUri);
  const client = await mongoClient.connect();
  const db = client.db('eshopdb');

  return {
    client,
    db,
  };
}
