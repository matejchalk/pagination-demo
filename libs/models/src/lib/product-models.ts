import { Static, Type } from '@sinclair/typebox';

export const productSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  imageUrl: Type.String(),
  price: Type.Number(),
  rating: Type.Optional(Type.Number()),
});
export type ProductModel = Static<typeof productSchema>;

export enum OrderDir {
  Asc = 'asc',
  Desc = 'desc',
}

export enum ProductOrderField {
  Name = 'name',
  Price = 'price',
  Rating = 'rating',
}

export const productsQuerySchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1 })),
  pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
  orderBy: Type.Optional(Type.Enum(ProductOrderField)),
  orderDir: Type.Optional(Type.Enum(OrderDir)),
});
export type ProductsQueryParams = Static<typeof productsQuerySchema>;

export const productsListSchema = Type.Object({
  items: Type.Array(productSchema),
  total: Type.Integer(),
  page: Type.Integer(),
  pageSize: Type.Integer(),
  orderBy: Type.Enum(ProductOrderField),
  orderDir: Type.Enum(OrderDir),
});
export type ProductsListModel = Static<typeof productsListSchema>;

export const productPathSchema = Type.Object({
  productId: Type.String(),
});
export type ProductPathParams = Static<typeof productPathSchema>;
