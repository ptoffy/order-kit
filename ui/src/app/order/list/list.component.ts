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
        this.orders = orders
      }
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

  prepare(orderId: string) {
    const order = this.orders.find(order => order._id === orderId)
    if (!order) return
    order.status = OrderStatus.Preparing

    this.orderService.update(order).subscribe({
      next: () => this.getOrders(OrderStatus.New)
    })
  }
}
