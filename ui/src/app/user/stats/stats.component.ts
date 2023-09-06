import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {
  selectedDate: string = new Date().toISOString().split('T')[0]
  totalBudget: number = 0

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchBudgetForDate()
  }

  fetchBudgetForDate(): void {
    this.orderService.fetchBudgetForDay(this.selectedDate).subscribe((budget: number) => {
      this.totalBudget = budget
    })
  }
}
