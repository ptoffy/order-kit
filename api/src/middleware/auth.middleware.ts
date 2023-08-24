import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// This middleware checks if the user is logged in
function checkAuth(req: Request, res: Response, next: Function) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    try {
        jwt.verify(token, process.env.JWT_PUBLIC_KEY!);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
}

export { checkAuth };
