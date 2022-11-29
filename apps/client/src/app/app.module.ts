import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ArrowLeftOutline,
  CreditCardOutline,
  ShoppingCartOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { StarRatingModule } from 'angular-star-rating';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { LocationsVirtualScrollComponent } from './components/locations-virtual-scroll/locations-virtual-scroll.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ReviewsInfiniteScrollComponent } from './components/reviews-infinite-scroll/reviews-infinite-scroll.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { DeliveryDatePipe } from './pipes/delivery-date.pipe';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ReviewsInfiniteScrollComponent,
    LocationsVirtualScrollComponent,
    ProductsComponent,
    ProductComponent,
    DurationPipe,
    DeliveryDatePipe,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'products',
        title: 'Products',
        component: ProductsComponent,
      },
      {
        path: 'product/:productId',
        title: 'Reviews',
        component: ProductComponent,
      },
      {
        path: 'cart',
        title: 'Locations',
        component: CartComponent,
      },
      { path: '**', redirectTo: '/products' },
    ]),
    HttpClientModule,
    ScrollingModule,
    InfiniteScrollModule,
    StarRatingModule.forRoot(),
    NzIconModule.forRoot([
      ArrowLeftOutline,
      UserOutline,
      ShoppingCartOutline,
      CreditCardOutline,
    ]),
    NzTableModule,
    NzButtonModule,
    NzImageModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzCommentModule,
    NzAvatarModule,
    NzListModule,
    NzSkeletonModule,
    NzCardModule,
    NzStatisticModule,
    NzTypographyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
