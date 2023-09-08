import { getItems } from "../controllers/item.controller"
import { checkAuth } from "../middleware/auth.middleware"

const router = require('express')()

/**
 * @swagger
 * /item:
 *   get:
 *     summary: Retrieve a list of menu items.
 *     description: Fetches all the menu items from the database.
 *     tags:
 *       - MenuItems
 *     parameters:
 *       - $ref: '#/components/parameters/Origin'
 *       - $ref: '#/components/parameters/Referer'
 *       - $ref: '#/components/parameters/x-auth-token'
 *       - $ref: '#/components/parameters/x-requested-with'
 *       - $ref: '#/components/parameters/jwt'
 *     responses:
 *       200:
 *         description: A list of menu items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
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
 *         description: Items not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Items not found"
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
 *               message: "Error getting items: "
 */
router.get('/', checkAuth(), getItems)

export default router
module.exports = router
