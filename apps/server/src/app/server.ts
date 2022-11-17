import {
  LocationsListModel,
  locationsListSchema,
  LocationsQueryParams,
  locationsQuerySchema,
  OrderDir,
  ProductOrderField,
  ProductsListModel,
  productsListSchema,
  ProductsQueryParams,
  productsQuerySchema,
  ReviewsListModel,
  reviewsListSchema,
  ReviewsPathParams,
  reviewsPathSchema,
  ReviewsQueryParams,
  reviewsQuerySchema,
} from '@pagination-demo/models';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import * as mongodb from 'mongodb';
import {
  Collection,
  dbSetup,
  LocationDocument,
  ProductDocument,
  ReviewDocument,
} from './db';

export async function createFastifyServer(): Promise<FastifyInstance> {
  const { db, client } = await dbSetup();

  const fastify: FastifyInstance = Fastify({ logger: true });

  fastify.addHook('onClose', () => {
    client.close();
  });

  fastify.get(
    '/products',
    {
      schema: {
        querystring: productsQuerySchema,
        response: { 200: productsListSchema },
      },
    },
    async (
      req: FastifyRequest<{ Querystring: ProductsQueryParams }>
    ): Promise<ProductsListModel> => {
      const {
        page = 1,
        pageSize = 50,
        orderBy = ProductOrderField.Rating,
        orderDir = OrderDir.Desc,
      } = req.query;

      const collection = db.collection<ProductDocument>(Collection.Products);

      const [docs, total] = await Promise.all([
        collection
          .find()
          .sort({ [orderBy]: orderDir })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .toArray(),
        collection.estimatedDocumentCount(),
      ]);

      return {
        items: docs.map((doc) => ({ ...doc, id: doc._id.toString() })),
        total,
        page,
        pageSize,
        orderBy,
        orderDir,
      };
    }
  );

  fastify.get(
    '/products/:productId/reviews',
    {
      schema: {
        params: reviewsPathSchema,
        querystring: reviewsQuerySchema,
        response: { 200: reviewsListSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Params: ReviewsPathParams;
        Querystring: ReviewsQueryParams;
      }>
    ): Promise<ReviewsListModel> => {
      const { first = 50, after } = req.query;

      const collection = db.collection<ReviewDocument>(Collection.Reviews);

      const docs = await collection
        .find(after ? { dateTime: { $lt: after } } : {})
        .sort({ dateTime: 'desc' })
        .limit(first + 1)
        .toArray();

      return {
        edges: docs.slice(0, first).map((doc) => ({
          node: { ...doc, id: doc._id.toString() },
          cursor: doc.dateTime,
        })),
        pageInfo: {
          hasNextPage: docs.length === first + 1,
          endCursor: docs[Math.min(docs.length, first) - 1]?.dateTime,
        },
      };
    }
  );

  fastify.get(
    '/locations',
    {
      schema: {
        querystring: locationsQuerySchema,
        response: { 200: locationsListSchema },
      },
    },
    async (
      req: FastifyRequest<{ Querystring: LocationsQueryParams }>
    ): Promise<LocationsListModel> => {
      const { first = 50, after } = req.query;

      const collection = db.collection<LocationDocument>(Collection.Locations);

      const docs = await collection
        .find(after ? { _id: { $lt: new mongodb.ObjectId(after) } } : {})
        .sort({ _id: 'asc' })
        .limit(first + 1)
        .toArray();

      return {
        edges: docs.slice(0, first).map((doc) => ({
          node: { ...doc, id: doc._id.toString() },
          cursor: doc._id.toString(),
        })),
        pageInfo: {
          hasNextPage: docs.length === first + 1,
          endCursor: docs[Math.min(docs.length, first) - 1]?._id.toString(),
        },
      };
    }
  );

  return fastify;
}

export async function runFastifyServer(
  fastify: FastifyInstance
): Promise<void> {
  try {
    await fastify.listen({ port: 3333 });

    const address = fastify.server.address();
    const port = typeof address === 'string' ? address : address?.port;

    console.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
