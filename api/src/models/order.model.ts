import { Schema, model } from "mongoose"
import { baseSchema, BaseModelType } from "./base.model"
import { MenuItemCategory, MenuItemType } from "./item.model"

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

export interface OrderMenuItemType extends MenuItemType {
    status: OrderMenuItemStatus
}

export interface OrderType extends BaseModelType {
    table: number
    items: OrderMenuItemType[]
    status: OrderStatus
    type: MenuItemCategory
}

const orderItemSchema = new Schema<OrderMenuItemType>({
    _id: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    status: {
        type: String, enum: Object.values(OrderMenuItemStatus),
        required: true, default: OrderMenuItemStatus.New
    }
})

const orderSchema = new Schema<OrderType>({
    ...baseSchema.obj,
    table: { type: Number, required: true },
    items: { type: [orderItemSchema], required: true },
    type: {
        type: String, enum: Object.values(MenuItemCategory),
        required: true, default: MenuItemCategory.Food
    },
    status: {
        type: String, enum: Object.values(OrderStatus),
        required: true, default: OrderStatus.New
    }
})

export const Order = model<OrderType>("Order", orderSchema)
