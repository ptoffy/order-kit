import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserType, User, UserRole } from '../models/user.model';
import { UserSessionData } from '../extensions/session+user';
import logger from '../logger';
import jwt from 'jsonwebtoken';

async function registerHandler(req: Request, res: Response) {
    try {
        const { email, password, name, role } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: passwordHash, name, role });
        // login(req, res, user);
    } catch (error) {
        logger.error("Error registering: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loginHandler(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user: UserType | null = await User.findOne({ email });
        if (!user) {
            // We don't want to tell the user that the email is not found 
            // since it could reveal whether a user is registered or not
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const passwordValid: boolean = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = generateAuthToken(user);
        res.json({ token });
    } catch (error) {
        logger.error("Error logging in: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteHandler(req: Request, res: Response) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error("Error deleting user: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


function generateAuthToken(user: UserType) {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
}

export { registerHandler, loginHandler, deleteHandler };
