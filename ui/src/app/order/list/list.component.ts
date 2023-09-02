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
    this.orderService.list(status).subscribe({
      next: (orders) => {
        this.orders = orders
        this.activeTab = status
      }
    })
  }

  getPreparationProgress(order: Order): number {
    const total = order.items.length
    const completed = order.items.filter(item => item.status === OrderMenuItemStatus.Done).length
    const preparing = order.items.filter(item => item.status === OrderMenuItemStatus.Preparing).length
    const remaining = completed + preparing * 0.5
    const progress = remaining / total * 100
    return progress
  }

  getProgressBarColour(order: Order): string {
    const percent = this.getPreparationProgress(order)
    const red = Math.min(255, Math.floor(255 - (percent * 1.5)))
    const green = Math.min(255, Math.floor(percent * 2.55))
    return `rgb(${red}, ${green}, 0)`
  }

  prepare(orderId: string) {
    const order = this.orders.find(order => order._id === orderId)
    if (!order) return
    order.status = OrderStatus.Preparing

    this.orderService.update(order).subscribe({
      next: () => this.getOrders(OrderStatus.New)
    })
  }

  done(itemId: string) {
    if (!itemId) return
    const order = this.orders.find(order => order.items.find(item => item._id === itemId))
    if (!order) return
    const item = order.items.find(item => item._id === itemId)
    if (!item) return
    item.status = OrderMenuItemStatus.Done

    if (order.items.every(item => item.status === OrderMenuItemStatus.Done)) {
      order.status = OrderStatus.Done
    }

    this.orderService.update(order).subscribe({
      next: () => this.getOrders(OrderStatus.Preparing)
    })
  }
}
