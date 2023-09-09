import logger from "../logger"
import { Table } from "../models/table.model"
import { User, UserRole } from "../models/user.model"

/**
 * Seeds the table collection.
 * @returns {Promise<void>} A promise that resolves when the collection has been seeded.
 */
export async function seedTables(): Promise<void> {
    const count = await Table.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding table collection...')

    const waiters = await User.find({ role: UserRole.Waiter })

    const tables = [
        { number: 1, seats: 4, occupancy: 4, waiterId: waiters[0]._id, orders: [] },
        { number: 2, seats: 3, occupancy: 0, waiterId: null, orders: [] },
        { number: 3, seats: 6, occupancy: 5, waiterId: waiters[1]._id, orders: [] },
        { number: 4, seats: 8, occupancy: 0, waiterId: null, orders: [] },
        { number: 5, seats: 2, occupancy: 2, waiterId: waiters[0]._id, orders: [] },
        { number: 6, seats: 4, occupancy: 0, waiterId: null, orders: [] },
    ]

    await Table.insertMany(tables)
    logger.info('🌳 Table collection seeded!')
}
