import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ProductModel,
  ProductPathParams,
  ProductsListModel,
  ProductsQueryParams,
} from '@pagination-demo/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly http: HttpClient) {}

  getProducts(query: ProductsQueryParams): Observable<ProductsListModel> {
    return this.http.get<ProductsListModel>(`${environment.apiUrl}/products`, {
      params: query,
    });
  }

  getProduct(params: ProductPathParams): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      `${environment.apiUrl}/products/${params.productId}`
    );
  }
}
