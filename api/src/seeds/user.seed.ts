import logger from '../logger'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'

export async function seedUser() {
    const count = await User.countDocuments()

    if (count > 0) return;

    logger.info('🌱 Seeding user collection...')

    const passwordHash = await bcrypt.hash('password', 10)
    const users = [
        { username: 'waiter', password: passwordHash, name: 'Walter Waiter', role: 'waiter' },
        { username: 'cook', password: passwordHash, name: 'Cody Cook', role: 'cook' },
        { username: 'bartender', password: passwordHash, name: 'Bethany Bartender', role: 'bartender' },
        { username: 'cashier', password: passwordHash, name: 'Cassandra Cashier', role: 'cashier' }
    ]

    await User.insertMany(users)
    logger.info('🌳 User collection seeded!')
}
