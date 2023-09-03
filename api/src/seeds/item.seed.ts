import logger from "../logger"
import { MenuItem, MenuItemCategory } from "../models/item.model"

export async function seedMenuItems() {
    const count = await MenuItem.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding item collection...')
    const items = [
        { name: "Coca Cola", price: 2.50, category: MenuItemCategory.Drink },
        { name: "Fanta", price: 2.50, category: MenuItemCategory.Drink },
        { name: "Sprite", price: 2.50, category: MenuItemCategory.Drink },
        { name: "Water", price: 2.00, category: MenuItemCategory.Drink },
        { name: "Burger", price: 5.00, category: MenuItemCategory.Food },
        { name: "Pizza", price: 7.50, category: MenuItemCategory.Food },
        { name: "Pasta", price: 6.00, category: MenuItemCategory.Food },
        { name: "Salad", price: 4.00, category: MenuItemCategory.Food },
        { name: "Ice Cream", price: 3.00, category: MenuItemCategory.Food },
        { name: "Cake", price: 3.50, category: MenuItemCategory.Food },
    ]

    await MenuItem.insertMany(items)

    logger.info('🌳 Item collection seeded!')
}
