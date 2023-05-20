import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import fs from 'fs';

import { requireAuthenticated } from './middleware/requireAuthenticated';
import logger from './logger';

// Import Controllers
import * as userController from './controllers/user';

// Create Express server
const app = express();

if (!process.env.SESSION_SECRET) {
    logger.error('No session secret. Set SESSION_SECRET environment variable.');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    logger.error('No Mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

// Connect to DB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    logger.info('Connected to MongoDB');
}).catch((err) => {
    logger.error('MongoDB connection error: ' + err);
    process.exit(1);
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());

// Session config
const sessionSettings = {
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}
app.use(session(sessionSettings)); 

// Routes

app.listen(app.get("port"), () => {
    console.log(
        'Orders API is running at http://localhost:%d in %s mode',
        app.get("port"),
        app.get("env")
    );
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default app;