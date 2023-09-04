import { IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { OrderMenuItemType, OrderStatus } from "../models/order.model"
import { MenuItemCategory } from "../models/item.model"

export class CreateOrderRequest {
    @IsNumber()
    @IsNotEmpty()
    table!: number

    @IsNotEmpty()
    items!: { _id: string, count: number }[]

    @IsNotEmpty()
    @IsEnum(MenuItemCategory)
    type!: MenuItemCategory
}

export class UpdateOrderRequest {
    items!: OrderMenuItemType[]

    @IsEnum(OrderStatus)
    status!: OrderStatus
}
