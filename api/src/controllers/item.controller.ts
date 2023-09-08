import { Request, Response } from "express"
import { MenuItem } from "../models/item.model"
import logger from "../logger"

/**
 * Get all items that are on the menu.
 * @param req The request object.
 * @param res The response object.
 * @returns The items that are on the menu.
 */
export async function getItems(req: Request, res: Response) {
    try {
        const items = await MenuItem.find().lean()

        if (!items) {
            logger.warn("Items not found")
            return res.status(404).json({ message: 'Items not found' })
        }

        res.status(200).json(items)
    } catch (err) {
        logger.error("Error getting items: " + err)
        res.status(400).json(err)
    }
}
