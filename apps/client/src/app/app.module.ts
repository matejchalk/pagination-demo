import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppComponent } from './app.component';
import { LocationsVirtualScrollComponent } from './components/locations-virtual-scroll/locations-virtual-scroll.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ReviewsInfiniteScrollComponent } from './components/reviews-infinite-scroll/reviews-infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ReviewsInfiniteScrollComponent,
    LocationsVirtualScrollComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    NzTableModule,
    NzButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
