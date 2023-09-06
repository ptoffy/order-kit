import { Schema, model } from "mongoose"
import { baseSchema, BaseModelType } from "./base.model"

export enum MenuItemCategory {
    Food = "food",
    Drinks = "drinks"
}

interface MenuItemType extends BaseModelType {
    name: string
    price: number
    category: string
    estimatedPrepTime: number
}

const menuItemSchema = new Schema<MenuItemType>({
    // ...baseSchema.obj,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    estimatedPrepTime: { type: Number, required: true },
}, { timestamps: true });

const MenuItem = model<MenuItemType>("MenuItem", menuItemSchema)

export { MenuItem, MenuItemType }
