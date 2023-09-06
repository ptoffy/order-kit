import logger from "../logger"
import { MenuItem, MenuItemCategory, MenuItemType } from "../models/item.model"

export async function seedMenuItems() {
    const count = await MenuItem.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding item collection...')

    const items: Partial<MenuItemType>[] = [
        { name: "Coca Cola", price: 2.50, category: MenuItemCategory.Drinks, estimatedPrepTime: 3 },
        { name: "Fanta", price: 2.50, category: MenuItemCategory.Drinks, estimatedPrepTime: 3 },
        { name: "Sprite", price: 2.50, category: MenuItemCategory.Drinks, estimatedPrepTime: 3 },
        { name: "Water", price: 2.00, category: MenuItemCategory.Drinks, estimatedPrepTime: 3 },
        { name: "Burger", price: 5.00, category: MenuItemCategory.Food, estimatedPrepTime: 10 },
        { name: "Pizza", price: 7.50, category: MenuItemCategory.Food, estimatedPrepTime: 15 },
        { name: "Pasta", price: 6.00, category: MenuItemCategory.Food, estimatedPrepTime: 10 },
        { name: "Salad", price: 4.00, category: MenuItemCategory.Food, estimatedPrepTime: 8 },
        { name: "Ice Cream", price: 3.00, category: MenuItemCategory.Food, estimatedPrepTime: 5 },
        { name: "Cake", price: 3.50, category: MenuItemCategory.Food, estimatedPrepTime: 3 },
    ]

    await MenuItem.insertMany(items)

    logger.info('🌳 Item collection seeded!')
}
