import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtUtil } from '../utils/jwt.util';
import { UserJwtPayload } from '../models/jwt.model';

// This middleware checks if the user is logged in
function checkAuth(req: Request, res: Response, next: Function) {
    const header = req.get('X-Orders-Auth-Token');

    if (!header) {
        return res.status(403).json({ message: 'Invalid token!' });
    }

    const token = header

    if (!token) {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    try {
        const decodedToken: UserJwtPayload = jwtUtil.verify(token) as UserJwtPayload;
        req.userId = decodedToken.id;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
}

export { checkAuth };
