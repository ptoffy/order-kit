import { loginHandler, registerHandler, deleteHandler, meHandler, usersHandler } from "../controllers/user.contoller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     description: |
 *       Registers a new user by taking the provided username, password, name, and role. 
 *       If the user already exists, an error is returned.
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *     requestBody:
 *       description: User registration data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationRequest'
 *           example:
 *             username: "walter"
 *             password: "walter"
 *             name: "Walter Waiter"
 *             role: "waiter"
 *     responses:
 *       201:
 *         description: Successfully registered user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *               payload: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
 *               expiration: "2023-09-05T12:00:00.000Z"
 *               role: "waiter"
 *               userId: "60d5f2a9b8f9f82d8877b479"
 *       400:
 *         description: Invalid request body or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User already exists"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/register', registerHandler)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user.
 *     description: |
 *       Authenticates a user based on the provided username and password.
 *       If successful, returns a JWT token.
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *     requestBody:
 *       description: User's login data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             username: "walter"
 *             password: "password"
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *               payload: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
 *               expiration: "2023-09-05T23:59:59.000Z"
 *               role: "waiter"
 *               userId: "60d5f2a9b8f9f82d8877b479"
 *       400:
 *         description: Invalid request body or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body: "
 *       401:
 *         description: Unauthorized, invalid username or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid email or password"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
router.post('/login', loginHandler)

/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Delete a user by their username.
 *     description: |
 *       Delete a user by their username.
 * 
 *       This endpoint is only accessible to cashiers.
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to delete.
 *         example: "walter"
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User deleted successfully"
 *       400:
 *         description: Invalid username or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body: "
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Please provide an authentication token!"
 *       403:
 *         description: Forbidden, user does not have permission to delete users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Forbidden"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
router.delete('/:username', checkAuth([UserRole.Cashier]), deleteHandler)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Fetch the currently logged in user.
 *     description: |
 *       Fetch the details of the currently logged in user based on the provided authentication token.
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     responses:
 *       200:
 *         description: Successfully fetched the user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               _id: "60d5f2a9b8f9f82d8877b479"
 *               username: "walter"
 *               name: "Walter Waiter"
 *               role: "waiter"
 *               statistics:
 *                 orders: 50
 *                 revenue: 500
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Please provide an authentication token!"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
router.get('/me', checkAuth(), meHandler)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Fetch all users except the one making the request.
 *     description: |
 *       Fetch all users from the database, excluding the user making the request.
 * 
 *       This endpoint is only accessible to cashiers.
 *     tags:
 *       - Users
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     responses:
 *       200:
 *         description: Successfully fetched users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - username: "walter"
 *                 name: "Walter Waiter"
 *                 role: "waiter"
 *                 statistics:
 *                   orders: 50
 *                   revenue: 500
 *       400:
 *         description: Invalid request or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body: "
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Please provide an authentication token!"
 *       403:
 *         description: Forbidden, user does not have permission to access this resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Forbidden"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
router.get('/', checkAuth([UserRole.Cashier]), usersHandler)

export default router
module.exports = router
