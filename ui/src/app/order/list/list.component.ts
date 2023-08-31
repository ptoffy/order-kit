import { Component } from '@angular/core';
import { MenuItem, MenuItemCategory } from 'src/app/core/models/item.model';
import { Order, OrderStatus } from 'src/app/core/models/order.model';
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
    this.orderService.list(status, MenuItemCategory.Food).subscribe({
      next: (orders) => {
        this.orders = orders.map((order: any) => ({
          id: order.id,
          table: order.table,
          items: order.items.map((item: any) => item.item as MenuItem),
          status: order.status as OrderStatus,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt)
        }));
      },
    })
  }
}
