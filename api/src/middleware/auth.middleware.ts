import { Request, Response } from 'express';

// This middleware checks if the user is logged in
function checkAuth(req: Request, res: Response, next: Function) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    next();
}

export { checkAuth };
