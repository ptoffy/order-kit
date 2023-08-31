import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';

import logger from './logger';
import morganMiddleware from './middleware/morgan.middleware';
import cookies from 'cookie-parser';

import { seedUser } from './seeds/user.seed';

// Create Express server
const app = express();

// Import env variables from env file only when in dev mode
if (app.get('env') === 'development') {
    require('dotenv').config({ path: 'api/.env' });
}

if (!process.env.SESSION_SECRET) {
    logger.error('No session secret. Set SESSION_SECRET environment variable.');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    logger.error('No Mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

if (!process.env.JWT_PRIVATE_KEY) {
    logger.error('No JWT private key. Set JWT_PRIVATE_KEY environment variable.');
    process.exit(1);
}

// Connect to DB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info('🐱 Connected to MongoDB');
    seedUser();
    seedTables();
}).catch((err) => {
    logger.error('❌ MongoDB connection error: ' + err);
    process.exit(1);
});

// Express configuration
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,
}));
app.use(cookies());

app.set('port', process.env.PORT || 3000);
app.use(express.json());

// Session config

// Add/configure our app to use the session middleware with a unique session id we generate. 
// We will log the request.sessionID object before and after the middleware is used.
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

// Logger
app.use(morganMiddleware);

// Socket.io
import { Server } from 'socket.io';
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>();
io.on('connection', (socket) => {
    console.log('a user connected');
});

// Routes

app.listen(app.get("port"), '0.0.0.0', () => {
    logger.info(
        '⏱️ Orders API is running at http://localhost:' + app.get("port") + ' in ' + app.get("env") + ' mode',
    );
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

import userRouter from './routers/user.router';
import { seedTables } from './seeds/table.seeds';
import tableRouter from './routers/table.router';
app.use('/users', userRouter);
app.use('/table', tableRouter);


export default app;
