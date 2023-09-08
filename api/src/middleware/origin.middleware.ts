import { Request, Response, NextFunction } from 'express'
import logger from '../logger'

/**
 * Checks if the origin and referer headers are valid.
 * @param allowedOrigins The allowed origins.
 * @param allowedReferers The allowed referers.
 * @returns A middleware function.
 * @throws An error if the origin or referer headers are not valid.
 */
export function originMiddleware(allowedOrigins: string[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const origin = req.headers['origin']
        const referer = req.headers['referer']

        if (origin && !allowedOrigins.includes(origin as string)) {
            logger.warn(`Origin ${origin} is not allowed`)
            return res.status(403).json({ message: 'Forbidden' })
        }

        if (referer && !allowedOrigins.some(o => referer.startsWith(o))) {
            logger.warn(`Referer ${referer} is not allowed`)
            return res.status(403).json({ message: 'Forbidden' })
        }

        next()
    }
}
