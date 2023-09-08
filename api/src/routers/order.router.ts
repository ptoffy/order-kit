import { createOrder, fetchBestSellingItems, fetchProfitForDay, getOrders, updateOrder, updateOrdersBulk } from "../controllers/order.controller"
import { checkAuth } from "../middleware/auth.middleware"
import { UserRole } from "../models/user.model"

const router = require('express')()

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve orders based on user role and other filters.
 *     description: |
 *       Get orders by status based on the logged in user's role:
 *       - Bartender: Drink orders
 *       - Chef: Food orders
 *       - Waiter: All orders for their tables
 *       - Cashier: All orders
 * 
 *       Then, filter the orders by status (if specified) and by creation date: only show orders created today.
 *       Finally, sort the orders by creation date by FIFO: the oldest orders are at the top.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/OrderStatus'
 *         description: Status of the order to filter by.
 *         example: "new"
 *       - in: query
 *         name: tableNumber
 *         schema:
 *           type: number
 *         description: Table number to filter orders by.
 *         example: 5
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *             examples:
 *               bartenderOrders:
 *                 summary: Example orders for a bartender.
 *                 value:
 *                   - number: 1
 *                     table: 5
 *                     status: "new"
 *                     type: "drinks"
 *                     items:
 *                       - name: "Coke"
 *                         price: 2.5
 *                         category: "drinks"
 *                         estimatedPrepTime: 5
 *                         status: "new"
 *                         cost: 1.0
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
 *         description: Orders not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Orders not found"
 *       400:
 *         description: Error occurred while fetching orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error getting orders: "
 *       500:
 *         description: Error occurred while fetching orders.
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
router.get('/', checkAuth(), getOrders)

/**
 * @swagger
 * /orders/{id}/update:
 *   post:
 *     summary: Update an order by its ID.
 *     description: |
 *       Update an order by its ID and notify the client of the status change. 
 *       If the order status is 'Done', also notify the client that the order is ready.
 *     tags:
 *       - Orders
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: ObjectId
 *         required: true
 *         description: ID of the order to update.
 *         example: "60d5f2a9b8f9f82d8877b479"
 *     requestBody:
 *       description: Updated order data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderRequest'
 *           example:
 *             status: "done"
 *             items: 
 *               - name: "Burger"
 *                 price: 10
 *                 category: "food"
 *                 estimatedPrepTime: 15
 *                 status: "done"
 *                 cost: 5
 *     responses:
 *       200:
 *         description: Successfully updated order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               _id: "60d5f2a9b8f9f82d8877b479"
 *               number: 1
 *               table: 5
 *               status: "done"
 *               type: "food"
 *               items:
 *                 - name: "Burger"
 *                   price: 10
 *                   category: "food"
 *                   estimatedPrepTime: 15
 *                   status: "done"
 *                   cost: 5
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body: "
 * 
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
 *         description: Order or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Order not found"
 *       500:
 *         description: Error occurred while fetching items.
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
router.post('/:id/update', checkAuth(), updateOrder)

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order.
 *     description: |
 *       Create a new order  and notify the client based on the order type (food or drink).
 * 
 *       This endpoint is only accessible to waiters.
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: Order data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *           example:
 *             table: 5
 *             type: "food"
 *             items:
 *               - _id: "60d5f2a9b8f9f82d8877b479"
 *                 count: 2
 *     responses:
 *       201:
 *         description: Successfully created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               _id: "60d5f2a9b8f9f82d8877b480"
 *               table: 5
 *               type: "food"
 *               items:
 *                 - _id: "60d5f2a9b8f9f82d8877b479"
 *                   status: "new"
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
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body: "
 *       500:
 *         description: Error occurred while fetching orders.
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
router.post('/', checkAuth([UserRole.Waiter]), createOrder)

/**
 * @swagger
 * /orders/bulk:
 *   post:
 *     summary: Update multiple orders at once.
 *     description: |
 *       Update multiple orders at once based on the provided order IDs and their new data.
 *
 *       This endpoint is only accessible to cashiers.
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: List of orders to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBulkOrderRequest'
 *           example:
 *             orders:
 *               - _id: "60d5f2a9b8f9f82d8877b479"
 *                 status: "done"
 *                 items:
 *                   - _id: "60d5f2a9b8f9f82d8877b480"
 *                     status: "new"
 *               - _id: "60d5f2a9b8f9f82d8877b481"
 *                 status: "preparing"
 *                 items:
 *                   - _id: "60d5f2a9b8f9f82d8877b482"
 *                     status: "new"
 *     responses:
 *       200:
 *         description: Successfully updated orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *             example:
 *               - _id: "60d5f2a9b8f9f82d8877b479"
 *                 status: "done"
 *                 items:
 *                   - _id: "60d5f2a9b8f9f82d8877b480"
 *                     status: "new"
 *               - _id: "60d5f2a9b8f9f82d8877b481"
 *                 status: "preparing"
 *                 items:
 *                   - _id: "60d5f2a9b8f9f82d8877b482"
 *                     status: "new"
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
 *       400:
 *         description: Invalid date or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error updating orders: "
 *       404:
 *         description: Orders not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Order not found"
 *       500:
 *         description: Error occurred while fetching orders.
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
router.post('/update-bulk', checkAuth([UserRole.Cashier]), updateOrdersBulk)

/**
 * @swagger
 * /orders/budget:
 *   get:
 *     summary: Fetch the profit for a specific day.
 *     description: |
 *       Fetch the profit for a specific day by subtracting the cost of the ingredients from the price of the menu items.
 * 
 *       This endpoint is only accessible to cashiers.
 *     tags:
 *       - Orders
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date for which to fetch the profit.
 *         example: "2023-09-05"
 *     responses:
 *       200:
 *         description: Successfully fetched profit for the day.
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 *             example: 150
 *       400:
 *         description: Invalid date or other error.
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
 *         description: Forbidden, user is not a cashier.
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
 *         description: No orders found for the specified date.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Orders not found"
 *       500:
 *         description: Error fetching profit for day.
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
router.get('/budget', checkAuth([UserRole.Cashier]), fetchProfitForDay)

/**
 * @swagger
 * /orders/best-selling-items:
 *   get:
 *     summary: Fetch the best selling items overall.
 *     description: |
 *       Fetch the best selling items overall, with the respective revenue.
 * 
 *       This endpoint is only accessible to cashiers.
 *     tags:
 *       - Orders
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     responses:
 *       200:
 *         description: Successfully fetched best selling items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   count:
 *                     type: number
 *             example:
 *               - name: "Burger"
 *                 count: 150
 *               - name: "Pizza"
 *                 count: 100
 *       400:
 *         description: Error occurred while fetching best selling items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Error fetching best selling items for day: "
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
 * 
 *       403:
 *         description: Forbidden, user is not a cashier.
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
 *         description: No orders found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Orders not found"
 *       500:
 *         description: Error occurred while fetching orders.
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
router.get('/best-selling-items', checkAuth([UserRole.Cashier]), fetchBestSellingItems)

export default router
module.exports = router
