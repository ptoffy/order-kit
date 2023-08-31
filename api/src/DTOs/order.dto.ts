import { IsNotEmpty, IsNumber, Matches } from "class-validator"
import { OrderStatus } from "../models/order.model"

export class CreateOrderRequest {
    @IsNumber()
    @IsNotEmpty()
    table!: number

    @IsNotEmpty()
    items!: { itemId: string, name: string, quantity: number, price: number }[]

    @IsNotEmpty()
    @Matches(/^${Object.values(OrderStatus).join('|')}/)
    status!: OrderStatus
}
