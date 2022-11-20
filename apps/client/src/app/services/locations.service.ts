import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LocationsListModel,
  LocationsQueryParams,
} from '@pagination-demo/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private readonly http: HttpClient) {}

  getLocations(query: LocationsQueryParams): Observable<LocationsListModel> {
    return this.http.get<LocationsListModel>(
      `${environment.apiUrl}/locations`,
      { params: query }
    );
  }
}
