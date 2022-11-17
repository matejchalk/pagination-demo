import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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
}
