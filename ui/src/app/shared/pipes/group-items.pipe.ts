import { Pipe, PipeTransform } from '@angular/core'
import { OrderMenuItem } from '../../core/models/order.model'

/**
 * Pipe to group items by name and return the count.
 */
@Pipe({
  name: 'groupItems'
})
export class GroupItemsPipe implements PipeTransform {
  transform(items: OrderMenuItem[]): { item: OrderMenuItem, count: number }[] {
    const grouped: { [key: string]: { item: OrderMenuItem, count: number } } = {}

    items.forEach(item => {
      if (grouped[item.name]) {
        grouped[item.name].count++
      } else {
        grouped[item.name] = { item, count: 1 }
      }
    })

    return Object.values(grouped)
  }
}
