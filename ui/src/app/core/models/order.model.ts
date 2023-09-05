import { BaseModel } from "./base.model"
import { MenuItem, MenuItemCategory } from "./item.model"

export enum OrderStatus {
  New = "new",
  Preparing = "preparing",
  Done = "done",
  Served = "served",
  Paid = "paid"
}

export enum OrderMenuItemStatus {
  New = "new",
  Preparing = "preparing",
  Done = "done"
}

export interface Order extends BaseModel {
  _id: string
  number: number
  table: number
  items: OrderMenuItem[]
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  type: MenuItemCategory
}

export interface OrderMenuItem extends MenuItem {
  status: OrderMenuItemStatus
}
