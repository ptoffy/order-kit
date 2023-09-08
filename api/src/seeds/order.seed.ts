import logger from "../logger"
import { MenuItem, MenuItemCategory } from "../models/item.model"
import { Order, OrderMenuItemStatus, OrderStatus, OrderType } from "../models/order.model"

/**
 * Seeds the orders collection.
 * @returns {Promise<void>} A promise that resolves when the collection has been seeded.
 */
export async function seedOrders(): Promise<void> {
    const count = await Order.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding order collection...')

    const drinks = await MenuItem.find({ category: MenuItemCategory.Drinks }).limit(5)

    const foods = await MenuItem.find({ category: MenuItemCategory.Food }).limit(5)

    const orders = [
        {
            table: 1,
            items: [
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[1]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Drinks
        },
        {
            table: 2,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.New },
                { _id: foods[1]._id, status: OrderMenuItemStatus.New },
                { _id: foods[2]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 3,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.New },
                { _id: foods[1]._id, status: OrderMenuItemStatus.New },
                { _id: foods[2]._id, status: OrderMenuItemStatus.New },
                { _id: foods[3]._id, status: OrderMenuItemStatus.New },
                { _id: foods[4]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 4,
            items: [
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[1]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[2]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[3]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Drinks
        },
        {
            table: 3,
            items: [
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[1]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[2]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[3]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[4]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Drinks
        },
        {
            table: 2,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.New },
                { _id: foods[1]._id, status: OrderMenuItemStatus.New },
                { _id: foods[2]._id, status: OrderMenuItemStatus.New },
                { _id: foods[3]._id, status: OrderMenuItemStatus.New },
                { _id: foods[4]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 5,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.New },
                { _id: foods[1]._id, status: OrderMenuItemStatus.New },
                { _id: foods[2]._id, status: OrderMenuItemStatus.New },
                { _id: foods[3]._id, status: OrderMenuItemStatus.New },
                { _id: foods[4]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 4,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[1]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[2]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[3]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[4]._id, status: OrderMenuItemStatus.Done },
            ],
            status: OrderStatus.Paid,
            type: MenuItemCategory.Food
        },
        {
            table: 6,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[1]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[2]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[3]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[4]._id, status: OrderMenuItemStatus.Done },
            ],
            status: OrderStatus.Paid,
            type: MenuItemCategory.Food
        },
        {
            table: 1,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[1]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[2]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[3]._id, status: OrderMenuItemStatus.Done },
                { _id: foods[4]._id, status: OrderMenuItemStatus.Done },
            ],
            status: OrderStatus.Paid,
            type: MenuItemCategory.Food
        }
    ]

    // await Order.insertMany(orders)

    // This is to make sure that there's a different createdAt date for each order
    for (const order of orders) {
        await Order.create(order)
    }

    logger.info('🌳 Order collection seeded!')
}
