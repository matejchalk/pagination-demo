import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pagination-demo-reviews-infinite-scroll',
  templateUrl: './reviews-infinite-scroll.component.html',
  styleUrls: ['./reviews-infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsInfiniteScrollComponent {}
