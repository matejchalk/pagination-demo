import { Pipe, PipeTransform } from '@angular/core';
import { LocationModel } from '@pagination-demo/models';
import { addDays, formatRelative, set } from 'date-fns';

@Pipe({
  name: 'deliveryDate',
})
export class DeliveryDatePipe implements PipeTransform {
  private readonly baseDate = new Date();

  transform(delivery: LocationModel['delivery']): string {
    return formatRelative(
      set(addDays(this.baseDate, delivery.days), {
        hours: delivery.time,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      this.baseDate
    );
  }
}
