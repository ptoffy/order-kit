import { BaseModel } from "./base.model";
import { MenuItem } from "./item.model";

export enum OrderStatus {
    New = "new",
    Preparing = "preparing",
    Done = "done",
    Served = "served"
}

export interface Order extends BaseModel {
    id: number;
    table: number
    items: MenuItem[]
    status: OrderStatus
    createdAt: Date
    updatedAt: Date
}
