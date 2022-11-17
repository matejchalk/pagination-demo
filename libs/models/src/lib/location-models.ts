import { Static, Type } from '@sinclair/typebox';

export const locationSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  address: Type.String(),
  delivery: Type.Object({
    days: Type.Integer({ minimum: 0 }),
    time: Type.Integer({ minimum: 0, maximum: 23 }),
  }),
  price: Type.Number({ minimum: 0 }),
});
export type LocationModel = Static<typeof locationSchema>;

export const locationsListSchema = Type.Object({
  edges: Type.Array(
    Type.Object({
      node: locationSchema,
      cursor: Type.String(),
    })
  ),
  pageInfo: Type.Object({
    hasNextPage: Type.Boolean(),
    endCursor: Type.Optional(Type.String()),
  }),
});
export type LocationsListModel = Static<typeof locationsListSchema>;

export const locationsQuerySchema = Type.Object({
  first: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
  after: Type.Optional(Type.String()),
});
export type LocationsQueryParams = Static<typeof locationsQuerySchema>;
