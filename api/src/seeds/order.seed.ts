import logger from "../logger"
import { MenuItem, MenuItemCategory } from "../models/item.model"
import { Order, OrderMenuItemStatus } from "../models/order.model"

export async function seedOrders() {
    const count = await Order.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding order collection...')

    const drinks = await MenuItem.find({ category: MenuItemCategory.Drink }).limit(5);

    const foods = await MenuItem.find({ category: MenuItemCategory.Food }).limit(5);

    const orders = [
        {
            table: 1,
            items: [
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[0]._id, status: OrderMenuItemStatus.New },
                { _id: drinks[1]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Drink
        },
        {
            table: 2,
            items: [
                { _id: foods[0]._id, status: OrderMenuItemStatus.New },
                { _id: foods[1]._id, status: OrderMenuItemStatus.New },
                { _id: foods[2]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
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
            status: OrderMenuItemStatus.New,
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
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Drink
        }
    ]

    // await Order.insertMany(orders)

    // This is to make sure that there's a different createdAt date for each order
    for (const order of orders) {
        await Order.create(order)
    }

    logger.info('🌳 Order collection seeded!')
}
