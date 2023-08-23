import { Schema, model } from "mongoose";
import { BaseModel, BaseModelType } from "./baseModel";

interface MenuItemType extends BaseModelType {
    name: string;
    price: number;
    category: string;
}

const menuItemSchema = new Schema<MenuItemType>({
    ...BaseModel.schema.obj,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

const MenuItem = model<MenuItemType>("MenuItem", menuItemSchema);

export { MenuItem, MenuItemType };
