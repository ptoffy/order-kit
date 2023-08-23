// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import { Model } from 'mongoose';
// import { UserType, User, UserRole } from '../models/user';
// import { UserSessionData } from '../extensions/session+user';
// import logger from '../logger';

// const app = require('express')();


// // create a function that renders a login page using angular.js
// function loginHandler(req: Request, res: Response) {
//     res.render('login');
// }

// async function registerPostHandler(req: Request, res: Response) {
//     try {
//         const { email, password, name, role } = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);
//         const user = await User.create({ email, password: passwordHash, name, role });
//         login(req, res, user);
//     } catch (error) {
//         logger.error("Error registering: " + error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// }

// async function loginPostHandler(req: Request, res: Response) {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user: UserType | null = await User.findOne({ email });
//     if (!user) {
//         // We don't want to tell the user that the email is not found 
//         // since it could reveal whether a user is registered or not
//         return res.status(401).send({ message: 'Invalid email or password' });
//     }

//     // Check if the password is correct
//     const passwordValid: boolean = await bcrypt.compare(password, user.password);
//     if (!passwordValid) {
//         return res.status(401).send({ message: 'Invalid email or password' });
//     }
// }

// function login(req: Request, res: Response, user: UserType) {
//     // Regenerate session when signing in to prevent fixation
//     req.session.regenerate(function (err: Error) {
//         if (err) {
//             logger.error("Error regenerating session: " + err);
//             res.status(500).send({ message: 'Internal Server Error' });
//         }

//         // Save the user data to the session
//         const sessionData = req.session as UserSessionData
//         sessionData.userId = user.id;
//         sessionData.role = user.role;

//         // Save the session
//         req.session.save(function (err: Error) {
//             if (err) {
//                 logger.error("Error saving session: " + err);
//                 res.status(500).send({ message: 'Internal Server Error' });
//             }
//             let returnPath = '/';
//             switch (user.role) {
//                 case UserRole.BARTENDER:
//                     returnPath = '/bartender';
//                     break;
//                 case UserRole.CASHIER:
//                     returnPath = '/cashier';
//                     break;
//                 case UserRole.WAITER:
//                     returnPath = '/waiter';
//                     break;
//                 case UserRole.COOK:
//                     returnPath = '/cook';
//                     break;
//             }
//             res.send({ message: 'Logged in successfully!' }).redirect(returnPath);
//         });
//     });
// }
