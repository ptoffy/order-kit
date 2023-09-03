import logger from "../logger"
import { Table } from "../models/table.model"

export async function seedTables() {
    const count = await Table.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding table collection...')

    const tables = [
        { number: 1, seats: 4, occupancy: 0, waiterId: null, orders: [] },
        { number: 2, seats: 3, occupancy: 0, waiterId: null, orders: [] },
        { number: 3, seats: 6, occupancy: 0, waiterId: null, orders: [] },
        { number: 4, seats: 8, occupancy: 0, waiterId: null, orders: [] },
        { number: 5, seats: 2, occupancy: 0, waiterId: null, orders: [] },
        { number: 6, seats: 4, occupancy: 0, waiterId: null, orders: [] },
    ]

    await Table.insertMany(tables)
    logger.info('🌳 Table collection seeded!')
}
