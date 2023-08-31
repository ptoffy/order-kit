import { Order, OrderStatus } from "../models/order.model"
import { Request, Response } from "express"
import { CreateOrderRequest } from "../DTOs/order.dto"
import { plainToClass } from "class-transformer"
import logger from "../logger"
import { validate } from "class-validator"
import { MenuItemCategory } from "../models/item.model"
import { UserRole } from "../models/user.model"

/**
 * Create an order.
 * @param req The request object.
 * @param res The response object.
 * @returns The created order.
 */
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

/**
 * Get orders by status based on the logged in user's role:
 * - Bartender: Drink orders
 * - Chef: Food orders
 * Finally, sort the orders by creation date by FIFO: the oldest orders are at the top.
 * @param req The request object.
 * @param res The response object.
 * @returns The orders.
 */
export async function getOrders(req: Request, res: Response) {
    try {
        const status = req.query.status as OrderStatus | undefined

        const type = req.role === UserRole.Bartender ? MenuItemCategory.Drink : MenuItemCategory.Food

        const orders = await Order.find(status ? { status, type } : { type })
            .populate('items.item', 'name price category')
            .sort({ createdAt: 1 })

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        res.status(200).json(orders)
    } catch (err) {
        logger.error("Error getting orders: " + err)
        res.status(400).json(err)
    }
}
