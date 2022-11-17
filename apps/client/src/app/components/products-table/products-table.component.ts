import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  OrderDir,
  ProductModel,
  ProductsQueryParams,
} from '@pagination-demo/models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pagination-demo-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  readonly defaultPageSize = 10;

  readonly loading$ = new BehaviorSubject(false);

  readonly productsList$ = this.route.queryParams.pipe(
    tap(() => {
      this.loading$.next(true);
    }),
    switchMap((query: ProductsQueryParams) =>
      this.productsService
        .getProducts({ pageSize: this.defaultPageSize, ...query })
        .pipe(
          tap(() => {
            this.loading$.next(false);
          })
        )
    )
  );

  readonly columns: {
    key: keyof ProductModel;
    label: string;
  }[] = [
    { key: 'name', label: 'Product' },
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
  ];

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  handleTableParamsChange(params: NzTableQueryParams): void {
    const sort = params.sort.find(({ value }) => value !== null);
    if (sort != null) {
      const queryParams: ProductsQueryParams = {
        page: params.pageIndex,
        orderBy: sort.key as ProductsQueryParams['orderBy'],
        orderDir: sort.value === 'ascend' ? OrderDir.Asc : OrderDir.Desc,
      };
      this.router.navigate([], { queryParams });
    }
  }
}
