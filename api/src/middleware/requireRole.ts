import { Request, Response, NextFunction } from 'express';

import { UserSessionData } from '../extensions/session+user';
import { User, UserRole } from '../models/user';
import logger from '../logger';

/**
 * Checks if the user is authenticated and has the specified role.
 * @param role The role to check for.
 * @returns A 403 response if the user is not authenticated or does not have the specified role.
 */
function requireRole(role: UserRole) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = req.session as UserSessionData;
        try {
            const user = await User.findById(session.userId);
            if (!user || user.role !== role) {
                return res.status(403).send({ message: 'Forbidden' });
            }
            next();
        } catch (err) {
            logger.error(err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}