import { Server } from 'socket.io'
import { Request } from 'express'

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string
        role: UserRole
        io: Server
    }
}
