import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  private readonly baseDate = new Date();

  transform(dateTime: string): string {
    return formatDistance(new Date(dateTime), this.baseDate);
  }
}
