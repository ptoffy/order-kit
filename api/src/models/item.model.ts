import { Schema, model } from "mongoose"
import { BaseModelType } from "./base.model"

export enum MenuItemCategory {
    Food = "food",
    Drinks = "drinks"
}

interface MenuItemType extends BaseModelType {
    name: string
    price: number
    category: MenuItemCategory
    estimatedPrepTime: number
    cost: number
}

const menuItemSchema = new Schema<MenuItemType>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: Object.values(MenuItemCategory), required: true },
    estimatedPrepTime: { type: Number, required: true },
    cost: { type: Number, required: true },
}, { timestamps: true })

const MenuItem = model<MenuItemType>("MenuItem", menuItemSchema)

export { MenuItem, MenuItemType }
