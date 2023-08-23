import { Schema, Document, Model, model, Types } from "mongoose";
import { BaseModel, BaseModelType } from "./base.model";

interface TableType extends BaseModelType {
    number: number;
    seats: number;
    occupancy: number;
    waiterId?: Types.ObjectId;
    orders: Types.ObjectId[];
}

const tableSchema = new Schema<TableType>({
    ...BaseModel.schema.obj,
    number: { type: Number, required: true },
    seats: { type: Number, required: true },
    occupancy: { type: Number, default: 0 },
    waiterId: { type: Types.ObjectId, ref: "User" },
    orders: [{ type: Types.ObjectId, ref: "Order" }]
});

const Table: Model<TableType> = model("Table", tableSchema);

export { TableType, Table };
