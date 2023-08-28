import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtUtil } from '../utils/jwt.util';
import { UserJwtPayload } from '../models/jwt.model';

// This middleware checks if the user is logged in
function checkAuth(req: Request, res: Response, next: Function) {
    var token = req.headers['x-auth-token'];

    // The `x-requested-with` header acts as a secondary check alongside the authentication token. 
    // If an attacker tries to exploit a potential CSRF vulnerability, 
    // they would need to know both the user's token and the fact that they need to include 
    // the `x-requested-with` header with the specific value XMLHttpRequest.
    const header = req.headers['x-requested-with'];

    // For a malicious site to add this header using JavaScript, 
    // it would need to make an XMLHttpRequest or Fetch API call. 
    // However, due to the Same-Origin Policy, 
    // the malicious site cannot make arbitrary requests to another domain 
    // with custom headers unless the target domain explicitly allows it via CORS.
    if (Array.isArray(token) || !token || header !== 'XMLHttpRequest') {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    if (!token) {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    const cookie = req.cookies.jwt_token;
    if (!cookie) {
        return res.status(401).json({ message: 'Please provide an authentication token!' });
    }

    token = token.concat('.', cookie);

    try {
        const decodedToken: UserJwtPayload = jwtUtil.verify(token) as UserJwtPayload;
        req.userId = decodedToken.id;
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token!' });
    }

    next();
}

export { checkAuth };
