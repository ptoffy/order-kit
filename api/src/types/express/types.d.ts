import { Server } from 'socket.io'
import { UserRole } from '../../models/user.model'

declare module 'express-serve-static-core' {
    interface Request {
        userId?: string
        role: UserRole
        io: Server
    }
}
