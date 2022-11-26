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
  items: Type.Array(locationSchema),
  page: Type.Integer(),
  pageSize: Type.Integer(),
  total: Type.Optional(Type.Integer()),
});
export type LocationsListModel = Static<typeof locationsListSchema>;

export const locationsQuerySchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1 })),
  pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
  includeTotal: Type.Optional(Type.Boolean()),
});
export type LocationsQueryParams = Static<typeof locationsQuerySchema>;
