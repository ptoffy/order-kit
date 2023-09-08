import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CreateOrderRequest } from 'src/app/core/dtos/order.dto'
import { MenuItem, MenuItemCategory } from 'src/app/core/models/item.model'
import { ItemService } from 'src/app/core/services/item.service'
import { OrderService } from 'src/app/core/services/order.service'
import { TableService } from 'src/app/core/services/table.service'

@Component({
  selector: 'app-order-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  MenuItemCategory = MenuItemCategory
  tables!: number[]
  createOrderRequest: CreateOrderRequest = { table: -1, items: [], type: 'food' }
  private _selectedCategory: 'food' | 'drinks' | null = null
  items: { food: MenuItem[], drinks: MenuItem[] } = { food: [], drinks: [] }
  selectedItems: { item: MenuItem, count: number }[] = []

  orderTypes = Object.values(MenuItemCategory)

  constructor(
    private orderService: OrderService,
    private tableService: TableService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableService.list(true, true).subscribe(tables => {
      this.tables = tables.map(t => t.number)
      this.createOrderRequest.table = this.tables[0]
    })
    this.itemService.list().subscribe(items => {
      this.items.food = items.filter(item => item.category === MenuItemCategory.Food)
      this.items.drinks = items.filter(item => item.category === MenuItemCategory.Drinks)
    })

    this.selectedItems.filter(item => item.item.category === this.selectedCategory)
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
        table: this.tables[0],
        items: [],
        type: 'food',
      }
      this.selectedItems = []
      this.router.navigate(['/orders/waiter-list'])
    })
  }

  get selectedCategory(): 'food' | 'drinks' | null {
    return this._selectedCategory
  }

  set selectedCategory(category: 'food' | 'drinks' | null) {
    this._selectedCategory = category
    this.selectedItems = this.selectedItems.filter(item => item.item.category === category)
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
