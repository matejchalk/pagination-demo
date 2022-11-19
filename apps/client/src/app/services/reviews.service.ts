import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ReviewsListModel,
  ReviewsPathParams,
  ReviewsQueryParams,
} from '@pagination-demo/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private readonly http: HttpClient) {}

  getReviews(
    params: ReviewsPathParams,
    query: ReviewsQueryParams
  ): Observable<ReviewsListModel> {
    return this.http.get<ReviewsListModel>(
      `${environment.apiUrl}/products/${params.productId}/reviews`,
      {
        params: query,
      }
    );
  }
}
