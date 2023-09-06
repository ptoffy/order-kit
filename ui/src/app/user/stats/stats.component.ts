import { Component } from '@angular/core';
import { User, UserRole } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  selectedDate: string = new Date().toISOString().split('T')[0]
  totalBudget: number = 0
  selectedWaiterId!: string
  selectedCookId!: string
  selectedBartenderId!: string

  cooks: User[] = []
  bartenders: User[] = []
  waiters: User[] = []

  ordersPreparedByCook: number = 0
  revenueForCook: number = 0
  ordersPreparedByBartender: number = 0
  revenueForBartender: number = 0

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.fetchBudgetForDate()
    this.authService.list().subscribe((users: User[]) => {
      this.cooks = users.filter(user => user.role === UserRole.Cook)
      this.bartenders = users.filter(user => user.role === UserRole.Bartender)
      this.waiters = users.filter(user => user.role === UserRole.Waiter)

      this.selectedCookId = this.cooks[0]._id
      this.updateOrdersPreparedByCook()
      this.selectedBartenderId = this.bartenders[0]._id
      this.updateOrdersPreparedByBartender()
    })
  }

  fetchBudgetForDate(): void {
    this.orderService.fetchBudgetForDay(this.selectedDate).subscribe((budget: number) => {
      this.totalBudget = budget
    })
  }

  fetchCustomersForWaiter(): void {
    // this.orderService.fetchCustomersForWaiter(this.selectedWaiter).subscribe((customers: number) => {
    //   this.totalBudget = customers
    // })
  }

  updateOrdersPreparedByCook(): void {
    const selectedCook = this.cooks.find(cook => cook._id === this.selectedCookId)
    if (selectedCook) {
      this.ordersPreparedByCook = selectedCook.statistics.orders
      this.revenueForCook = selectedCook.statistics.revenue
    } else {
      this.ordersPreparedByCook = 0
      this.revenueForCook = 0
    }
  }

  updateOrdersPreparedByBartender(): void {
    const selectedBartender = this.bartenders.find(bartender => bartender._id === this.selectedBartenderId)
    if (selectedBartender) {
      this.ordersPreparedByBartender = selectedBartender.statistics.orders
      this.revenueForBartender = selectedBartender.statistics.revenue
    } else {
      this.ordersPreparedByBartender = 0
      this.revenueForBartender = 0
    }
  }

}
