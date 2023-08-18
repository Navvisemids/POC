import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string): string {
    if (value?.length > 10) {
      return value.substring(0, 10).concat('...');
    }
    return value;
  }
}
