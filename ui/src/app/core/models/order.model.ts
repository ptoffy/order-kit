import { BaseModel } from "./base.model"
import { MenuItem } from "./item.model"

export enum OrderStatus {
    New = "new",
    Preparing = "preparing",
    Done = "done",
    Served = "served"
}

export enum OrderMenuItemStatus {
    New = "new",
    Preparing = "preparing",
    Done = "done"
}

export interface Order extends BaseModel {
    _id: string
    table: number
    items: OrderMenuItem[]
    status: OrderStatus
    createdAt: Date
    updatedAt: Date
}

export interface OrderMenuItem extends MenuItem {
    status: OrderMenuItemStatus
}
