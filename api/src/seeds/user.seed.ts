import { hash } from 'bcryptjs'
import logger from '../logger'
import { User, UserRole, UserType } from '../models/user.model'

/**
 * Seeds the user collection.
 * @returns {Promise<void>} A promise that resolves when the collection has been seeded.
 */
export async function seedUser(): Promise<void> {
    const count = await User.countDocuments()

    if (count > 0) return

    logger.info('🌱 Seeding user collection...')

    const passwordHash = await hash('password', 10)
    const users: Partial<UserType>[] = [
        { username: 'walter', password: passwordHash, name: 'Walter Waiter', role: UserRole.Waiter },
        { username: 'wilmer', password: passwordHash, name: 'Wilmer Waiter', role: UserRole.Waiter, statistics: { orders: 10, revenue: 100 } },
        { username: 'cody', password: passwordHash, name: 'Cody Cook', role: UserRole.Cook },
        { username: 'carl', password: passwordHash, name: 'Carl Cook', role: UserRole.Cook, statistics: { orders: 10, revenue: 100 } },
        { username: 'bethany', password: passwordHash, name: 'Bethany Bartender', role: UserRole.Bartender },
        { username: 'brenda', password: passwordHash, name: 'Brenda Bartender', role: UserRole.Bartender, statistics: { orders: 10, revenue: 100 } },
        { username: 'cassandra', password: passwordHash, name: 'Cassandra Cashier', role: UserRole.Cashier },
        { username: 'cindy', password: passwordHash, name: 'Cindy Cashier', role: UserRole.Cashier, statistics: { orders: 10, revenue: 100 } },
    ]

    await User.insertMany(users)
    logger.info('🌳 User collection seeded!')
}
