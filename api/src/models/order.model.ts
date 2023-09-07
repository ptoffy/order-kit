import { Schema, model } from "mongoose"
import { BaseModelType } from "./base.model"
import { MenuItemCategory, MenuItemType } from "./item.model"

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

export interface OrderMenuItemType extends MenuItemType {
    status: OrderMenuItemStatus
}

export interface OrderType extends BaseModelType {
    number: number
    table: number
    items: OrderMenuItemType[]
    status: OrderStatus
    type: MenuItemCategory
    createdAt: Date
    updatedAt: Date
    paid: boolean
}

const orderItemSchema = new Schema<OrderMenuItemType>({
    _id: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    status: {
        type: String, enum: Object.values(OrderMenuItemStatus),
        required: true, default: OrderMenuItemStatus.New
    }
})

const orderSchema = new Schema<OrderType>({
    table: { type: Number, required: true },
    items: { type: [orderItemSchema], required: true },
    number: { type: Number, required: true, default: 1 },
    type: {
        type: String, enum: Object.values(MenuItemCategory),
        required: true, default: MenuItemCategory.Food
    },
    status: {
        type: String, enum: Object.values(OrderStatus),
        required: true, default: OrderStatus.New
    },
}, { timestamps: true })

orderSchema.pre<OrderType>("save", function (next) {
    if (!this.isNew) return next()
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)
    const latest = Order.findOne({ createdAt: { $gte: startOfDay } }).sort({ number: -1 })
    latest.then((order) => {
        this.number = order ? order.number + 1 : 1
        next()
    })
})

export const Order = model<OrderType>("Order", orderSchema)
