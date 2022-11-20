import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { LocationModel, LocationsListModel } from '@pagination-demo/models';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { LocationsService } from '../../services/locations.service';

const PAGE_SIZE = 50;

@Component({
  selector: 'pagination-demo-locations-virtual-scroll',
  templateUrl: './locations-virtual-scroll.component.html',
  styleUrls: ['./locations-virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsVirtualScrollComponent {
  @Output() readonly selectLocation = new EventEmitter<string>();

  readonly locationsDataSource = new LocationsDataSource(this.locationsService);

  constructor(private readonly locationsService: LocationsService) {}

  handleSelect(locationId: string): void {
    this.selectLocation.emit(locationId);
  }
}

class LocationsDataSource extends DataSource<LocationModel | undefined> {
  private readonly dataStream$ = new BehaviorSubject<
    (LocationModel | undefined)[]
  >([]);
  private readonly lastPageInfo$ = new BehaviorSubject<
    LocationsListModel['pageInfo'] | null
  >(null);
  private readonly total$ = new BehaviorSubject(0);

  private readonly fetchedCursors = new Set<string>();

  private readonly subscription = new Subscription();

  constructor(private readonly locationsService: LocationsService) {
    super();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(LocationModel | undefined)[]> {
    this.fetchPage();

    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        if (
          range.end >= this.dataStream$.value.length &&
          this.lastPageInfo$.value?.hasNextPage
        ) {
          this.fetchPage(this.lastPageInfo$.value.endCursor);
        }
      })
    );

    return this.dataStream$.pipe(
      map((locations) =>
        this.total$.value
          ? Array.from({ length: this.total$.value }).map(
              (_, i) => locations[i]
            )
          : locations
      )
    );
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private fetchPage(cursor?: string): void {
    if (cursor) {
      if (this.fetchedCursors.has(cursor)) {
        return;
      }
      this.fetchedCursors.add(cursor);
    }

    this.locationsService
      .getLocations({
        first: PAGE_SIZE,
        ...(cursor ? { after: cursor } : { includeTotal: true }),
      })
      .subscribe((data) => {
        if (data.total) {
          this.total$.next(data.total);
        }
        this.lastPageInfo$.next(data.pageInfo);
        this.dataStream$.next([
          ...this.dataStream$.value,
          ...data.edges.map(({ node }) => node),
        ]);
      });
  }
}
