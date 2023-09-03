import { Component } from '@angular/core'
import { Order, OrderMenuItemStatus, OrderStatus } from 'src/app/core/models/order.model'
import { User } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { OrderService } from 'src/app/core/services/order.service'

@Component({
  selector: 'app-waiter-list',
  templateUrl: './waiter-list.component.html',
  styleUrls: ['./waiter-list.component.css']
})
export class WaiterListComponent {
  orders: Order[] = []
  OrderStatus = OrderStatus
  waiter!: User

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }


  getOrders() {
    const id = this.authService.getCurrentUserId()
    if (!id) return
    this.orderService.listForWaiter(id).subscribe({
      next: (orders) => this.orders = orders
    })
  }

  getSpecificOrders(status: OrderStatus) {
    return this.orders.filter(order => order.status === status)
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
}
