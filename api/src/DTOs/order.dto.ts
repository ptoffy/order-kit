import { IsEnum, IsNotEmpty, IsNumber, Matches, ValidateNested } from "class-validator"
import { OrderMenuItemType, OrderStatus } from "../models/order.model"
import { Type } from "class-transformer"

export class CreateOrderRequest {
    @IsNumber()
    @IsNotEmpty()
    table!: number

    @IsNotEmpty()
    items!: OrderMenuItemType[]

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status!: OrderStatus
}

export class UpdateOrderRequest {
    items!: OrderMenuItemType[]

    @IsEnum(OrderStatus)
    status!: OrderStatus
}
