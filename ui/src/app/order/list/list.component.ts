import { Component } from '@angular/core';
import { Order, OrderMenuItem, OrderMenuItemStatus, OrderStatus } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent {
  orders: Order[] = []
  activeTab: string = 'new'
  OrderStatus = OrderStatus

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders(OrderStatus.New)
  }

  getOrders(status: OrderStatus) {
    this.activeTab = status
    this.orderService.list(status).subscribe({
      next: (orders) => {
        this.orders = orders.map((order: any) => ({
          id: order.id,
          table: order.table,
          items: order.items.map((item: any) => {
            const orderItem = item.item as OrderMenuItem
            orderItem.status = item.status as OrderMenuItemStatus
            return orderItem
          }),
          status: order.status as OrderStatus,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        }));
      },
    })
  }

  getPreparationProgress(order: Order) {
    const total = order.items.length
    const completed = order.items.filter(item => item.status === OrderMenuItemStatus.Done).length
    const preparing = order.items.filter(item => item.status === OrderMenuItemStatus.Preparing).length
    const remaining = completed + preparing * 0.5
    const progress = remaining / total * 100
    return `${progress}%`
  }
}
