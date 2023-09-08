import { assignTable, freeTable, listTables, occupyTable } from "../controllers/table.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

/**
 * @swagger
 * /table:
 *   get:
 *     summary: Lists all tables.
 *     description: |
 *       Lists all tables. If the waiterOnly query parameter is set to true, only tables assigned to the current waiter are returned.
 *     tags:
 *       - Tables
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: query
 *         name: waiterOnly
 *         schema:
 *           type: boolean
 *         required: false
 *         description: If set to true, only tables assigned to the current waiter are returned.
 *         example: true
 *     responses:
 *       200:
 *         description: Successfully listed tables.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TableType'
 *             example:
 *               - number: 1
 *                 seats: 4
 *                 occupancy: 2
 *                 waiterId: "60d5f2a9b8f9f82d8877b479"
 *                 orders: ["60d5f2a9b8f9f82d8877b480"]
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
 *         description: Forbidden, user is not a waiter or a cashier.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Forbidden"
 *       400:
 *         description: Invalid waiter ID or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid waiter ID"
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
router.get('/', checkAuth([UserRole.Waiter, UserRole.Cashier]), listTables)

/**
 * @swagger
 * /table/{tableNumber}/occupy:
 *   post:
 *     summary: Occupies a table by setting its occupancy to the given people count.
 *     description: |
 *       Occupies a table by setting its occupancy to the given people count. 
 *       The occupancy cannot exceed the table's seating capacity.
 *     tags:
 *       - Tables
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: path
 *         name: tableNumber
 *         schema:
 *           type: number
 *         required: true
 *         description: Number of the table to occupy.
 *         example: 5
 *     requestBody:
 *       description: Number of people to occupy the table.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               peopleCount:
 *                 type: number
 *           example:
 *             peopleCount: 3
 *     responses:
 *       200:
 *         description: Successfully occupied the table.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableType'
 *             example:
 *               number: 5
 *               seats: 6
 *               occupancy: 3
 *               waiterId: "60d5f2a9b8f9f82d8877b479"
 *               orders: ["60d5f2a9b8f9f82d8877b480"]
 *       400:
 *         description: Invalid people count or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid people count"
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
 *         description: Forbidden, user is not a waiter.
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
 *         description: Table not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Table not found"
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
router.post('/:tableNumber/occupy', checkAuth([UserRole.Waiter]), occupyTable)

/**
 * @swagger
 * /table/{tableNumber}/free:
 *   post:
 *     summary: Frees a table by setting its occupancy to 0.
 *     description: |
 *       Frees a table by setting its occupancy to 0 and removing the waiter assignment.
 *     tags:
 *       - Tables
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: path
 *         name: tableNumber
 *         schema:
 *           type: number
 *         required: true
 *         description: Number of the table to free.
 *         example: 5
 *     responses:
 *       200:
 *         description: Successfully freed the table.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableType'
 *             example:
 *               number: 5
 *               seats: 4
 *               occupancy: 0
 *               waiterId: null
 *               orders: []
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
 *         description: Forbidden, user is not a waiter or a cashier.
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
 *         description: Table not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Table not found"
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
router.post('/:tableNumber/free', checkAuth([UserRole.Waiter, UserRole.Cashier]), freeTable)

/**
 * @swagger
 * /table/{tableNumber}/assign:
 *   post:
 *     summary: Assigns a table to the current waiter.
 *     description: |
 *       Assigns a specific table to the currently logged-in waiter.
 *       This endpoint is only accessible to waiters.
 *     tags:
 *       - Tables
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: path
 *         name: tableNumber
 *         schema:
 *           type: number
 *         required: true
 *         description: Number of the table to be assigned.
 *         example: 5
 *     responses:
 *       200:
 *         description: Successfully assigned the table to the waiter.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TableType'
 *             example:
 *               number: 5
 *               seats: 4
 *               occupancy: 2
 *               waiterId: "60d5f2a9b8f9f82d8877b479"
 *               orders: ["60d5f2a9b8f9f82d8877b480", "60d5f2a9b8f9f82d8877b481"]
 *       400:
 *         description: Invalid waiter ID or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid waiter ID"
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
 *         description: Forbidden, user is not a waiter.
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
 *         description: Table not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Table not found"
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
router.post('/:tableNumber/assign', checkAuth([UserRole.Waiter]), assignTable)

export default router
module.exports = router
