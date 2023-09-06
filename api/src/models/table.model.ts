import { Schema, Model, model, Types } from "mongoose"
import { BaseModelType } from "./base.model"

interface TableType extends BaseModelType {
    number: number
    seats: number
    occupancy: number
    waiterId?: Types.ObjectId | null
    orders: Types.ObjectId[] | null
}

const tableSchema = new Schema<TableType>({
    number: { type: Number, required: true, unique: true },
    seats: { type: Number, required: true },
    occupancy: { type: Number, default: 0 },
    waiterId: { type: Types.ObjectId, ref: "User" },
    orders: [{ type: Types.ObjectId, ref: "Order" }]
}, { timestamps: true })

const Table: Model<TableType> = model("Table", tableSchema)

export { TableType, Table }
