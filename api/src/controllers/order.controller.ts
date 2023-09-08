import { Order, OrderMenuItemStatus, OrderMenuItemType, OrderStatus, OrderType } from "../models/order.model"
import { Request, Response } from "express"
import { CreateOrderRequest, UpdateBulkOrderRequest, UpdateOrderRequest } from "../DTOs/order.dto"
import { plainToClass } from "class-transformer"
import logger from "../logger"
import { validate } from "class-validator"
import { MenuItemCategory } from "../models/item.model"
import { User, UserRole } from "../models/user.model"
import { Table } from "../models/table.model"
import { Types } from "mongoose"

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

        const items: { _id: Types.ObjectId, status: OrderMenuItemStatus }[] = []

        orderRequest.items.forEach(item => {
            items.push(...Array(item.count).fill({
                _id: new Types.ObjectId(item._id),
                status: OrderMenuItemStatus.New
            }))
        })

        const order = await Order.create({
            table: orderRequest.table,
            type: orderRequest.type,
            items: items
        })

        req.io.emit(order.type === MenuItemCategory.Food ? 'new-food-order' : 'new-drink-order', order)

        res.status(201).json(order)
    } catch (err) {
        logger.error("Error creating order: " + err)
        res.status(500).json("Internal Server Error")
    }
}

/**
 * Get orders by status based on the logged in user's role:
 * - Bartender: Drink orders
 * - Chef: Food orders
 * - Waiter: All orders for their tables
 * Then, filter the orders by status (if specified) and by creation date: only show orders created today.
 * Finally, sort the orders by creation date by FIFO: the oldest orders are at the top.
 * @param req The request object.
 * @param res The response object.
 * @returns The orders.
 */
export async function getOrders(req: Request, res: Response) {
    try {
        const status = req.query.status as OrderStatus | undefined

        const query = Order.find()

        // If the user is a bartender, only show drink orders
        if (req.role == UserRole.Bartender)
            query.where('type', MenuItemCategory.Drinks)

        // If the user is a cook, only show food orders
        else if (req.role == UserRole.Cook)
            query.where('type', MenuItemCategory.Food)

        // If a table number is specified, only show orders for that table
        if (req.query.tableNumber)
            query.where('table', req.query.tableNumber)

        // If the user is a waiter, only show orders for their tables
        if (req.role === UserRole.Waiter) {
            const tables = await Table.find({ waiterId: req.userId }).select('number')
            const tableNumbers = tables.map(table => table.number)
            query.where('table').in(tableNumbers)
        }

        // If a status is specified, only show orders with that status
        if (status)
            query.where('status', status)

        // Show only orders created today
        query.where('createdAt').gte(new Date().setHours(0, 0, 0, 0))

        // Populate the items with the menu item data
        var orders = await query
            .populate({
                path: 'items._id',
                model: 'MenuItem',
                select: 'name price category estimatedPrepTime cost',
            })
            .sort({ createdAt: 1 })
            .lean()

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        // Transform the data to the format expected by the UI
        const transformedData: OrderType[] = orders.map(order => ({
            _id: order._id,
            number: order.number,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            table: order.table,
            status: order.status as OrderStatus,
            type: order.type as MenuItemCategory,
            items: order.items.map((item: any) => ({
                _id: item._id._id,
                name: item._id.name,
                price: item._id.price,
                category: item._id.category,
                estimatedPrepTime: item._id.estimatedPrepTime,
                status: item.status as OrderMenuItemStatus,
                cost: item._id.cost
            }))
        })) as OrderType[]

        res.status(200).json(transformedData)
    } catch (err) {
        logger.error("Error getting orders: " + err)
        res.status(500).json("Internal Server Error")
    }
}

/**
 * Update an order by id.
 * Also, emit an event to the client to notify them of the status change.
 * @param req The request object containing the order id in the params and the updated order in the body.
 * @param res The response object.
 * @returns The updated order.
 * @throws 400 if the request body is invalid.
 * @throws 404 if the order is not found.
 * @throws 404 if the user to emit the event to is not found.
 * @throws 400 if an error occurs.
 */
export async function updateOrder(req: Request, res: Response) {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            logger.warn("Order not found: " + req.params.id)
            return res.status(404).json({ message: 'Order not found' })
        }

        const orderRequest = plainToClass(UpdateOrderRequest, req.body)
        const errors = await validate(orderRequest)

        if (errors.length > 0) {
            const message = "Invalid request body: " + errors.map((error: any) => Object.values(error.constraints)).join(', ')
            logger.warn(message)
            return res.status(400).json(message)
        }

        order.status = orderRequest.status
        order.items = orderRequest.items

        req.io.emit('order-status-change', order)

        if (orderRequest.status === OrderStatus.Done) {
            req.io.emit('order-ready', order)

            const user = await User.findById(req.userId)
            if (!user) {
                logger.warn("User not found: " + req.userId)
                return res.status(404).json({ message: 'User not found' })
            }
            user.statistics.orders += 1

            const profit = orderRequest.items.reduce((acc, item) => {
                return acc + item.price - item.cost
            }, 0)

            user.statistics.revenue += profit

            await user.save()
        }

        await order.save()

        res.status(200).json(order)
    } catch (err) {
        logger.error("Error updating order: " + err)
        res.status(500).json("Internal Server Error")
    }
}

/**
 * Update multiple orders at once.
 * @param req The request object containing the orders to update in the body.
 * @param res The response object.
 * @returns The updated orders.
 * @throws 400 if the request body is invalid.
 * @throws 404 if no orders are found.
 */
export async function updateOrdersBulk(req: Request, res: Response) {
    try {
        const updateBulkOrderRequest = plainToClass(UpdateBulkOrderRequest, req.body)
        const errors = await validate(updateBulkOrderRequest)

        if (errors.length > 0) {
            const message = "Invalid request body: " + errors
            logger.warn(message)
            return res.status(400).json(message)
        }

        const orders = await Order.find({ _id: { $in: updateBulkOrderRequest.orders.map(order => order._id) } })

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        orders.forEach(order => {
            const updatedOrder = updateBulkOrderRequest.orders.find((o: OrderType) => o._id == order._id)!
            order.status = updatedOrder.status
            order.items = updatedOrder.items

            if (order.status === OrderStatus.Done) {
                logger.info("Order " + order._id + " is ready, emitting event")
                req.io.emit('order-ready', order)
            }
        })

        await Promise.all(orders.map(order => order.save()))

        res.status(200).json(orders)
    } catch (err) {
        logger.error("Error updating orders: " + err)
        res.status(500).json("Internal Server Error")
    }
}

/**
 * Fetch the profit for a specific day.
 * The profit is calculated by subtracting the cost of the ingredients from the price of the menu items.
 * @param req The request object containing the date in the query string.
 * @param res The response object.
 * @returns The profit for the day.
 * @throws 400 if the date is invalid.
 * @throws 404 if no orders are found for the specified date.
 */
export async function fetchProfitForDay(req: Request, res: Response) {
    try {
        const date = new Date(req.query.date as string)
        date.setHours(0, 0, 0, 0)
        const nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + 1)

        const orders = await Order.find({
            status: OrderStatus.Paid,
            updatedAt: {
                $gte: date,
                $lt: nextDay
            }
        }).populate({
            path: 'items._id',
            model: 'MenuItem',
            select: 'name price category estimatedPrepTime cost',
        }).lean()

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        const profit = orders.reduce((acc, order) => {
            return acc + order.items.reduce((acc, item: any) => {
                return acc + item._id.price - item._id.cost
            }, 0)
        }, 0)

        res.status(200).json(profit)
    } catch (err) {
        logger.error("Error fetching profit for day: " + err)
        res.status(500).json("Internal Server Error")
    }
}

/**
 * Fetch the best selling items overall, with the respective revenue.
 * @param req The request object.
 * @param res The response object.
 * @returns The best selling items.
 * @throws 404 if no orders are found.
 * @throws 400 if an error occurs.
 */
export async function fetchBestSellingItems(req: Request, res: Response) {
    try {
        const orders = await Order.find().populate({
            path: 'items._id',
            model: 'MenuItem',
            select: 'name',
        }).lean()

        if (!orders) {
            logger.warn("Orders not found")
            return res.status(404).json({ message: 'Orders not found' })
        }

        const itemCounts: { [key: string]: number } = {}

        orders.forEach(order => {
            order.items.forEach((item: any) => {
                const itemName = item._id.name
                if (itemCounts[itemName]) {
                    itemCounts[itemName]++
                } else {
                    itemCounts[itemName] = 1
                }
            })
        })

        const itemsArray = Object.keys(itemCounts).map(itemName => ({
            name: itemName,
            count: itemCounts[itemName]
        }))

        itemsArray.sort((a, b) => b.count - a.count)

        res.status(200).json(itemsArray)
    } catch (err) {
        logger.error("Error fetching best selling items for day: " + err)
        res.status(500).json("Internal Server Error")
    }
}

