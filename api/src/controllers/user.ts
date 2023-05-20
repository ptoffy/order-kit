import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserType, User } from '../models/user';
import { UserSessionData } from '../extensions/session+user';
import logger from '../logger';

const app = require('express')();

async function register(req: Request, res: Response) {
    try {
        const { email, password, name, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: passwordHash, name, role });
        const session = req.session as UserSessionData;
        session.userId = user.id;
        session.userId = user.role;
        res.status(201).send({ message: 'Registered successfully!' });
    } catch (error) {
        logger.error("Error registering: " + error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        // We don't want to tell the user that the email is not found 
        // since it could reveal whether a user is registered or not
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Save the user data to the session
    const sessionData = req.session as UserSessionData
    sessionData.userId = user.id;
    sessionData.role = user.role;

    res.send({ message: 'Logged in successfully!' });
}