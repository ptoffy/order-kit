import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import cors from 'cors'

import logger from './logger'
import morganMiddleware from './middleware/morgan.middleware'
import cookies from 'cookie-parser'

// Create Express server
const app = express()
const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://ui:4200']

// Import env variables from env file only when in dev mode
if (app.get('env') === 'development') {
    require('dotenv').config({ path: '.env' })
}

if (!process.env.PORT) {
    logger.error('No port. Set PORT environment variable.')
    process.exit(1)
}

if (!process.env.SESSION_SECRET) {
    logger.error('No session secret. Set SESSION_SECRET environment variable.')
    process.exit(1)
}

if (!process.env.MONGODB_URI) {
    logger.error('No Mongo connection string. Set MONGODB_URI environment variable.')
    process.exit(1)
}

if (!process.env.JWT_PRIVATE_KEY) {
    logger.error('No JWT private key. Set JWT_PRIVATE_KEY environment variable.')
    process.exit(1)
}

// Connect to DB
import { seedUser } from './seeds/user.seed'
import { seedTables } from './seeds/table.seed'
import { seedOrders } from './seeds/order.seed'
import { seedMenuItems } from './seeds/item.seed'

mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info('🐱 Connected to MongoDB')
    seedUser()
    seedTables()
    seedMenuItems().then(() => seedOrders())
}).catch((err: Error) => {
    logger.error('❌ MongoDB connection error: ' + err)
    process.exit(1)
})

// Express configuration
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'x-auth-token'],
}))
app.use(cookies())

app.set('port', process.env.PORT || 3000)
app.use(express.json())

// Session config

// Add/configure our app to use the session middleware with a unique session id we generate. 
// We will log the request.sessionID object before and after the middleware is used.
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))

// Logger
app.use(morganMiddleware)

// Socket.io
import { Server } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './types/socket'

const server = require('http').createServer(app)
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
    }
})
app.use((req, _, next) => {
    req.io = io
    next()
})

import { originMiddleware } from './middleware/origin.middleware'
app.use(originMiddleware(allowedOrigins))

io.listen(server)

// Routes

server.listen(process.env.PORT, '0.0.0.0', () => {
    logger.info(`⏱️ Orders API is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`)
})

app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!')
})

import userRouter from './routers/user.router'
import tableRouter from './routers/table.router'
import orderRouter from './routers/order.router'
import itemRouter from './routers/item.router'
app.use('/users', userRouter)
app.use('/table', tableRouter)
app.use('/order', orderRouter)
app.use('/item', itemRouter)

export default app
