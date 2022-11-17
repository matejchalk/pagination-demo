import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pagination-demo-locations-virtual-scroll',
  templateUrl: './locations-virtual-scroll.component.html',
  styleUrls: ['./locations-virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsVirtualScrollComponent {}
