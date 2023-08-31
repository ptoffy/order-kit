import { BaseModel } from "./base.model"

export enum MenuItemCategory {
    Drink = "drink",
    Food = "food"
}

export interface MenuItem extends BaseModel {
    name: string
    price: number
    category: MenuItemCategory
}
