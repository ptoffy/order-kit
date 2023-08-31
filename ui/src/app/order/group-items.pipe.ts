import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from 'src/app/core/models/item.model';

@Pipe({
  name: 'groupItems'
})
export class GroupItemsPipe implements PipeTransform {
  transform(items: MenuItem[]): { name: string, count: number }[] {
    const grouped: { [key: string]: number } = {};

    items.forEach(item => {
      if (grouped[item.name]) {
        grouped[item.name]++;
      } else {
        grouped[item.name] = 1;
      }
    });

    return Object.keys(grouped).map(name => ({ name, count: grouped[name] }));
  }

}
