import { Request, Response, NextFunction } from 'express';

import { UserSessionData } from '../extensions/session+user';

/**
 * Checks if the user is authenticated.
 * @param req The request object.
 * @param res The response object.
 * @param next The function to call if the user is authenticated.
 * @returns A 401 response if the user is not authenticated.
 */
function requireAuthenticated(req: Request, res: Response, next: NextFunction) {
    const session = req.session as UserSessionData;
    if (!session || !session.userId) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
}

export { requireAuthenticated };