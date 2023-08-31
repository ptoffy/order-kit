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
                { item: drinks[0]._id, status: OrderMenuItemStatus.New },
                { item: drinks[0]._id, status: OrderMenuItemStatus.New },
                { item: drinks[1]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Drink
        },
        {
            table: 2,
            items: [
                { item: foods[0]._id, status: OrderMenuItemStatus.New },
                { item: foods[1]._id, status: OrderMenuItemStatus.New },
                { item: foods[2]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 3,
            items: [
                { item: foods[0]._id, status: OrderMenuItemStatus.New },
                { item: foods[1]._id, status: OrderMenuItemStatus.New },
                { item: foods[2]._id, status: OrderMenuItemStatus.New },
                { item: foods[3]._id, status: OrderMenuItemStatus.New },
                { item: foods[4]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Food
        },
        {
            table: 4,
            items: [
                { item: drinks[0]._id, status: OrderMenuItemStatus.New },
                { item: drinks[1]._id, status: OrderMenuItemStatus.New },
                { item: drinks[2]._id, status: OrderMenuItemStatus.New },
                { item: drinks[3]._id, status: OrderMenuItemStatus.New },
            ],
            status: OrderMenuItemStatus.New,
            type: MenuItemCategory.Drink
        }
    ]

    await Order.insertMany(orders)

    logger.info('🌳 Order collection seeded!')
}
