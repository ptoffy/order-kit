import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil } from 'rxjs'
import { Order, OrderMenuItemStatus, OrderStatus } from 'src/app/core/models/order.model'
import { UserRole } from 'src/app/core/models/user.model'
import { AuthService } from 'src/app/core/services/auth.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { OrderService } from 'src/app/core/services/order.service'
import { TableService } from 'src/app/core/services/table.service'

@Component({
  selector: 'app-order-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  orders: Order[] = []
  OrderStatus = OrderStatus
  UserRole = UserRole
  currentUserRole!: UserRole
  private destroy$ = new Subject<void>()

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private tableService: TableService,
  ) {
    this.currentUserRole = this.authService.getCurrentUserRole()!
  }

  ngOnInit(): void {
    this.getOrders()

    this.notificationService.orderUpdate$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getOrders()
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  getOrders() {
    const id = this.authService.getCurrentUserId()
    if (!id) return
    this.orderService.list().subscribe({
      next: (orders) => this.orders = orders
    })
  }

  getSpecificOrders(status: OrderStatus) {
    return this.orders.filter(order => order.status === status)
  }

  getPreparationProgress(order: Order): number {
    const total = order.items.length
    const completed = order.items.filter(item => item.status === OrderMenuItemStatus.Done).length
    const progress = completed / total * 100
    return progress
  }

  getPreparationEstimatedTime(order: Order): string {
    const total = order.items
      .filter(item => item.status === OrderMenuItemStatus.Preparing)
      .reduce((total, item) => total + item.estimatedPrepTime, 0)
    return `${total} min`
  }

  calculateEstimatedPrepTime(order: Order) {
    const groupedItems: { [key: string]: number } = {}

    for (const orderItem of order.items) {
      if (!groupedItems[orderItem.category])
        groupedItems[orderItem.category] = 0

      if (orderItem.status === OrderMenuItemStatus.Preparing)
        groupedItems[orderItem.category] += orderItem.estimatedPrepTime
    }

    // Calculate time for each group
    let totalPrepTime = 0
    for (const category in groupedItems) {
      const groupTime = groupedItems[category]
      // Assuming 50% efficiency for parallel cooking
      // This is a simple formula; you can adjust based on real-world observations
      const efficiencyFactor = 1 + 0.5 * (groupTime / groupTime - 1)
      totalPrepTime += groupTime * efficiencyFactor
    }

    return totalPrepTime
  }

  getProgressBarColour(order: Order): string {
    const percent = this.getPreparationProgress(order)
    const red = Math.min(255, Math.floor(255 - (percent * 1.5)))
    const green = Math.min(255, Math.floor(percent * 2.55))
    return `rgb(${red}, ${green}, 0)`
  }

  serveOrder(order: Order) {
    order.status = OrderStatus.Served
    this.orderService.update(order).subscribe({
      next: () => this.getOrders()
    })
  }
}
