import logger from '../logger';
import { User } from '../models/user.model';
import bcrypt from 'bcrypt';

async function seedUser() {
    const count = await User.countDocuments();

    if (count > 0) return;

    logger.info('🌱 Seeding user collection...');

    const passwordHash = await bcrypt.hash('password', 10);
    const users = [
        { username: 'waiter', password: passwordHash, name: 'Waiter', role: 'waiter' },
        { username: 'cook', password: passwordHash, name: 'Cook', role: 'cook' },
        { username: 'bartender', password: passwordHash, name: 'Bartender', role: 'bartender' },
        { username: 'cashier', password: passwordHash, name: 'Cashier', role: 'cashier' }
    ]

    await User.insertMany(users);
    logger.info('🌳 User collection seeded!');
}

export { seedUser };
