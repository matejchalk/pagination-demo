import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductPathParams } from '@pagination-demo/models';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'pagination-demo-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  readonly product$ = this.route.params.pipe(
    switchMap((params) =>
      this.productsService.getProduct(params as ProductPathParams)
    )
  );

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  handleBack(): void {
    this.router.navigate(['/products']);
  }
}
