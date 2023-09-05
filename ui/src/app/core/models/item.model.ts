import { BaseModel } from "./base.model"

export enum MenuItemCategory {
    Drinks = "drinks",
    Food = "food"
}

export interface MenuItem extends BaseModel {
    _id: string
    name: string
    price: number
    category: MenuItemCategory
}
