import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Order, OrderMenuItem, OrderStatus } from 'src/app/core/models/order.model'
import { Table } from 'src/app/core/models/table.model'
import { OrderService } from 'src/app/core/services/order.service'
import { TableService } from 'src/app/core/services/table.service'

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html'
})
export class PayModalComponent implements OnInit {
  @Input() orders!: Order[]
  @Input() table!: Table
  total!: number
  items!: OrderMenuItem[]

  constructor(
    public activeModal: NgbActiveModal,
    private orderService: OrderService,
    private tableService: TableService,
  ) { }

  ngOnInit(): void {
    this.orderService.list(OrderStatus.Served, this.table.number).subscribe({
      next: orders => {
        this.orders = orders,
          this.items = this.orders.flatMap(order => order.items),
          this.total = this.getTotal()
      }
    })
  }

  getTotal(): number {
    return this.orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((orderTotal, item) => orderTotal + item.price, 0)
      return total + orderTotal
    }, 0)
  }

  pay(): void {
    this.orders.forEach(order => {
      if (order.table === this.table.number)
        order.status = OrderStatus.Paid
    })
    this.orderService.updateBulk(this.orders).subscribe({
      next: () => this.tableService.free(this.table.number).subscribe({
        next: () => this.activeModal.close(),
      })
    })
  }
}
