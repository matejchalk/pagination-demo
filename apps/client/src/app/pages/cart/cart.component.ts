import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPathParams } from '@pagination-demo/models';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pagination-demo-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly product$ = this.route.queryParams.pipe(
    switchMap((params) =>
      this.productsService.getProduct(params as ProductPathParams)
    )
  );

  private readonly selectedLocationId$ = new BehaviorSubject<string | null>(
    null
  );
  readonly isLocationNotSelected$ = this.selectedLocationId$.pipe(
    map((id) => id == null)
  );

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  handleBack(): void {
    if (this.selectedLocationId$.value != null) {
      this.selectedLocationId$.next(null);
    } else {
      this.router.navigate(['/products']);
    }
  }

  handleSelectLocation(locationId: string): void {
    this.selectedLocationId$.next(locationId);
  }
}
