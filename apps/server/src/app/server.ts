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

export function createFastifyServer(): FastifyInstance {
  const fastify: FastifyInstance = Fastify({ logger: true });

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
      return {
        items: [],
        total: 0,
        page: 1,
        pageSize: 50,
        orderBy: ProductOrderField.Rating,
        orderDir: OrderDir.Desc,
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
      return {
        edges: [],
        pageInfo: {
          hasNextPage: false,
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
      return {
        edges: [],
        pageInfo: {
          hasNextPage: false,
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
