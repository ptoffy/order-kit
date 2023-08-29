import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserType, User } from '../models/user.model';
import logger from '../logger';
import { plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength, validate } from 'class-validator';
import { jwtUtil } from '../utils/jwt.util';
import mongoose from 'mongoose';

export async function usersHandler(req: Request, res: Response) {
    try {
        const userId = mongoose.mongo.ObjectId.createFromHexString(req.userId!)
        const users = await User.find({ _id: { $ne: userId } })
        res.json(users)
    } catch (error) {
        logger.error("Error getting users: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function meHandler(req: Request, res: Response) {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        logger.error("Error getting user: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function registerHandler(req: Request, res: Response) {
    try {
        const registrationRequest = plainToClass(RegistrationRequest, req.body);
        const errors = await validate(registrationRequest);

        if (errors.length > 0) {
            const message = "Invalid request body: " + errors.map((error: any) => Object.values(error.constraints)).join(', ');
            logger.warn(message);
            return res.status(400).json(message);
        }

        const { username, password, name, role } = req.body;

        // Check if the user already exists
        const userExists = await User.exists({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: passwordHash, name, role });

        // Generate a JWT token
        const { header, payload, signature, expiration } = generateAuthToken(user);
        res.cookie('jwt_token', `${signature}`, { httpOnly: true, expires: new Date(expiration) });
        res.status(201).json(new LoginResponse(header, payload, expiration, user.role, user._id.toHexString()));
    } catch (error) {
        logger.error("Error registering: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function loginHandler(req: Request, res: Response) {
    try {
        const loginRequest = plainToClass(LoginRequest, req.body);
        const errors = await validate(loginRequest);

        if (errors.length > 0) {
            const message = "Invalid request body: " + errors.map((error: any) => Object.values(error.constraints)).join(', ');
            logger.warn(message);
            return res.status(400).json(message);
        }

        // Check if the user exists
        const user: UserType | null = await User.findOne({ username: loginRequest.username });
        if (!user) {
            // We don't want to tell the user that the email is not found 
            // since it could reveal whether a user is registered or not
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const passwordValid: boolean = await bcrypt.compare(loginRequest.password, user.password);
        if (!passwordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const { header, payload, signature, expiration } = generateAuthToken(user);
        res.cookie('jwt_token', `${signature}`, { expires: new Date(expiration) });
        res.status(200).json(new LoginResponse(header, payload, expiration, user.role, user._id.toHexString()));
    } catch (error) {
        logger.error("Error logging in: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteHandler(req: Request, res: Response) {
    try {
        const username = req.params.username;
        const user = await User.findOneAndDelete({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error("Error deleting user: " + error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

function generateAuthToken(user: UserType): {
    header: string, payload: string, signature: string, expiration: number,
} {
    const token = jwtUtil.sign({ id: user._id, role: user.role })
    const expiration = Date.now() + 3600000;
    let split = token.split('.');
    return { header: split[0], payload: split[1], signature: split[2], expiration };
}

class LoginRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}
class RegistrationRequest {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    role!: string;
}

class LoginResponse {
    header!: string;
    payload!: string;
    expiration!: number;
    role!: string;
    id!: string;

    constructor(header: string, payload: string, expiration: number, role: string, id: string) {
        this.header = header;
        this.payload = payload;
        this.expiration = expiration;
        this.role = role;
        this.id = id;
    }
}
