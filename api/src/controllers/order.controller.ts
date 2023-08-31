import { Order, OrderStatus } from "../models/order.model"
import { Request, Response } from "express"
import { CreateOrderRequest } from "../DTOs/order.dto"
import { plainToClass } from "class-transformer"
import logger from "../logger"
import { validate } from "class-validator"
import { MenuItem, MenuItemCategory } from "../models/item.model"
import { UserRole } from "../models/user.model"

export async function createOrder(req: Request, res: Response) {
    try {
        const orderRequest = plainToClass(CreateOrderRequest, req.body)
        const errors = await validate(orderRequest)

        if (errors.length > 0) {
            const message = "Invalid request body: " + errors.map((error: any) => Object.values(error.constraints)).join(', ')
            logger.warn(message)
            return res.status(400).json(message)
        }

        const order = await Order.create(req.body)
        res.status(201).json(order)
    } catch (err) {
        logger.error("Error creating order: " + err)
        res.status(400).json(err)
    }
}

export async function getOrders(req: Request, res: Response) {
    try {
        const status = req.query.status as OrderStatus | undefined

        const type = req.role === UserRole.Bartender ? MenuItemCategory.Drink : MenuItemCategory.Food

        const orders = await Order.find(status ? { status, type } : { type })
            .populate('items.item', 'name price category')

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        res.json(orders)
    } catch (err) {
        logger.error("Error getting orders: " + err)
        res.status(400).json(err)
    }
}
