import { Schema, model } from "mongoose";
import { BaseModel, BaseModelType } from "./baseModel";

enum OrderStatus {
    NEW = "new",
    PREPARING = "preparing",
    DONE = "done",
    SERVED = "served"
}

interface OrderType extends BaseModelType {
    table: number;
    items: { itemId: string, name: string, quantity: number, price: number }[];
    status: OrderStatus;
}

const orderSchema = new Schema<OrderType>({
    ...BaseModel.schema.obj,
    table: { type: Number, required: true },
    items: { type: [String], required: true },
    status: {
        type: String, enum: Object.values(OrderStatus),
        required: true, default: OrderStatus.NEW
    },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const Order = model<OrderType>("Order", orderSchema);

export { Order, OrderStatus };
