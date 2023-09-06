import logger from '../logger'
import { User, UserRole, UserType } from '../models/user.model'
import bcrypt from 'bcrypt'

export async function seedUser() {
    const count = await User.countDocuments()

    if (count > 0) return;

    logger.info('🌱 Seeding user collection...')

    const passwordHash = await bcrypt.hash('password', 10)
    const users: Partial<UserType>[] = [
        { username: 'waiter', password: passwordHash, name: 'Walter Waiter', role: UserRole.Waiter },
        { username: 'cook', password: passwordHash, name: 'Cody Cook', role: UserRole.Cook },
        { username: 'bartender', password: passwordHash, name: 'Bethany Bartender', role: UserRole.Bartender },
        { username: 'cashier', password: passwordHash, name: 'Cassandra Cashier', role: UserRole.Cashier }
    ]

    await User.insertMany(users)
    logger.info('🌳 User collection seeded!')
}
