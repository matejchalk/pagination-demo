import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ReviewModel,
  ReviewsListModel,
  ReviewsPathParams,
} from '@pagination-demo/models';
import { BehaviorSubject, map, scan, Subject } from 'rxjs';
import { ReviewsService } from '../../services/reviews.service';

const PAGE_SIZE = 20;

@Component({
  selector: 'pagination-demo-reviews-infinite-scroll',
  templateUrl: './reviews-infinite-scroll.component.html',
  styleUrls: ['./reviews-infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsInfiniteScrollComponent {
  private readonly lastPageData$ = new Subject<ReviewsListModel>();
  private readonly endCursor$ = new BehaviorSubject<string | undefined>(
    undefined
  );

  readonly loadingInitial$ = new BehaviorSubject(false);
  private readonly loadingMore$ = new BehaviorSubject(false);

  readonly reviews$ = this.lastPageData$.pipe(
    scan<ReviewsListModel, ReviewModel[]>(
      (acc, data) => [...acc, ...data.edges.map(({ node }) => node)],
      []
    )
  );

  readonly skeletons$ = this.loadingMore$.pipe(
    map((loading) => (loading ? Array.from({ length: PAGE_SIZE }) : null))
  );

  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly route: ActivatedRoute
  ) {
    this.fetchPage();
  }

  trackByReviewId(_: number, review: ReviewModel): string {
    return review.id;
  }

  handleScroll(): void {
    if (this.endCursor$.value) {
      this.fetchPage(this.endCursor$.value);
    }
  }

  private fetchPage(cursor?: string): void {
    if (cursor) {
      this.loadingMore$.next(true);
    } else {
      this.loadingInitial$.next(true);
    }
    this.reviewsService
      .getReviews(this.route.snapshot.params as ReviewsPathParams, {
        first: PAGE_SIZE,
        ...(cursor && {
          after: cursor,
        }),
      })
      .subscribe((data) => {
        this.lastPageData$.next(data);
        this.endCursor$.next(data.pageInfo.endCursor);

        if (cursor) {
          this.loadingMore$.next(false);
        } else {
          this.loadingInitial$.next(false);
        }
      });
  }
}
