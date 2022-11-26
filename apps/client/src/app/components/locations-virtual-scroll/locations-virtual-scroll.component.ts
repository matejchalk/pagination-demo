import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { LocationModel } from '@pagination-demo/models';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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

  private readonly fetchedPages = new Set<number>();

  private readonly subscription = new Subscription();

  constructor(private readonly locationsService: LocationsService) {
    super();
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(LocationModel | undefined)[]> {
    this.fetchPage(1);

    this.subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        this.fetchPage(Math.floor((range.end - 1) / PAGE_SIZE) + 1);
      })
    );

    return this.dataStream$;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.locationsService
      .getLocations({
        page,
        pageSize: PAGE_SIZE,
        ...(page === 1 && { includeTotal: true }),
      })
      .subscribe((data) => {
        if (data.total) {
          this.dataStream$.next(
            Array.from({ length: data.total }).map(
              (_, i) => this.dataStream$.value[i]
            )
          );
        }
        this.dataStream$.next([
          ...this.dataStream$.value.slice(0, (page - 1) * PAGE_SIZE),
          ...data.items,
          ...this.dataStream$.value.slice(page * PAGE_SIZE),
        ]);
      });
  }
}
