import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ArrowLeftOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { StarRatingModule } from 'angular-star-rating';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { LocationsVirtualScrollComponent } from './components/locations-virtual-scroll/locations-virtual-scroll.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ReviewsInfiniteScrollComponent } from './components/reviews-infinite-scroll/reviews-infinite-scroll.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductsComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: '**', redirectTo: '/products' },
    ]),
    HttpClientModule,
    InfiniteScrollModule,
    StarRatingModule.forRoot(),
    NzIconModule.forRoot([ArrowLeftOutline, UserOutline]),
    NzTableModule,
    NzButtonModule,
    NzImageModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzCommentModule,
    NzAvatarModule,
    NzListModule,
    NzSkeletonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
