import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateOrderRequest } from 'src/app/core/dtos/order.dto';
import { MenuItem, MenuItemCategory } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';
import { OrderService } from 'src/app/core/services/order.service';
import { TableService } from 'src/app/core/services/table.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  MenuItemCategory = MenuItemCategory
  tables!: number[]
  createOrderRequest: CreateOrderRequest = {
    table: 1,
    items: [],
    type: 'food',
  }
  selectedCategory: 'food' | 'drink' | null = null
  items: { food: MenuItem[], drink: MenuItem[] } = {
    food: [],
    drink: [],
  }
  selectedItems: { item: MenuItem, count: number }[] = []

  orderTypes = Object.values(MenuItemCategory)

  constructor(
    private orderService: OrderService,
    private tableService: TableService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableService.list().subscribe(tables => this.tables = tables.map(t => t.number))
    this.itemService.list().subscribe(items => {
      this.items.food = items.filter(item => item.category === MenuItemCategory.Food)
      this.items.drink = items.filter(item => item.category === MenuItemCategory.Drink)
    })
  }

  createOrder() {
    if (this.selectedCategory === null) return
    const items = this.selectedItems.map(item => ({ _id: item.item._id, count: item.count }))
    const order: CreateOrderRequest = {
      table: +this.createOrderRequest.table,
      items: items,
      type: this.selectedCategory,
    }
    this.orderService.create(order).subscribe(() => {
      this.createOrderRequest = {
        table: 1,
        items: [],
        type: 'food',
      }
      this.selectedItems = []
      this.router.navigate(['/order/waiter-list'])
    })

  }

  addItem(item: MenuItem) {
    const selectedItem = this.selectedItems.find(si => si.item === item)
    if (selectedItem) {
      selectedItem.count++
    } else {
      this.selectedItems.push({ item: item, count: 1 })
    }
  }

  removeItem(item: MenuItem) {
    const selectedItem = this.selectedItems.find(si => si.item === item)
    if (selectedItem) {
      selectedItem.count--
      if (selectedItem.count <= 0) {
        this.selectedItems = this.selectedItems.filter(si => si.item !== item)
      }
    }
  }

  getItemCount(item: MenuItem): number {
    const selectedItem = this.selectedItems.find(si => si.item === item)
    return selectedItem ? selectedItem.count : 0
  }
}
