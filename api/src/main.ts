import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

import logger from './logger';

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

// Add/configure our app to use the session middleware with a unique session id we generate. 
// We will log the request.sessionID object before and after the middleware is used.
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

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

// var userRouter = require('./routes/user');
// app.use('/users', userRouter);

export default app;
