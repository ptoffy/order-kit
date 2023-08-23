import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserRole } from '../models/user.model';
import logger from '../logger';

// This middleware checks if the user has the required role to access a resource
function checkRole(requiredRole: UserRole) {
    return function (req: Request, res: Response, next: Function) {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
            const role = decoded.role;

            if (role !== requiredRole) {
                logger.warn(`User with role ${role} tried to access a resource that requires role ${requiredRole}`);
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    }
}

export { checkRole };
