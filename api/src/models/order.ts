import mongoose from "mongoose";

enum OrderStatus {
    NEW = "new",
    PREPARING = "preparing",
    DONE = "done",
    SERVED = "served"
}

interface Order extends Document {
    table: number;
    items: string[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<Order>({
    table: { type: Number, required: true },
    items: { type: [String], required: true },
    status: { type: String, enum: Object.values(OrderStatus), required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

const OrderModel = mongoose.model<Order>("Order", orderSchema);

export { Order, OrderModel, OrderStatus };
