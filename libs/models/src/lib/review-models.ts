import { Static, Type } from '@sinclair/typebox';

export const reviewSchema = Type.Object({
  id: Type.String(),
  dateTime: Type.String(),
  text: Type.String(),
  rating: Type.Number(),
  author: Type.Optional(
    Type.Object({
      name: Type.String(),
      avatarUrl: Type.String(),
    })
  ),
});
export type ReviewModel = Static<typeof reviewSchema>;

export const reviewsListSchema = Type.Object({
  edges: Type.Array(
    Type.Object({
      node: reviewSchema,
      cursor: Type.String(),
    })
  ),
  pageInfo: Type.Object({
    hasNextPage: Type.Boolean(),
    endCursor: Type.Optional(Type.String()),
  }),
});
export type ReviewsListModel = Static<typeof reviewsListSchema>;

export const reviewsPathSchema = Type.Object({
  productId: Type.String(),
});
export type ReviewsPathParams = Static<typeof reviewsPathSchema>;

export const reviewsQuerySchema = Type.Object({
  first: Type.Optional(Type.Integer({ minimum: 1, maximum: 1000 })),
  after: Type.Optional(Type.String()),
});
export type ReviewsQueryParams = Static<typeof reviewsQuerySchema>;
