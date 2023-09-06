import { Request, Response } from 'express';
import logger from "../logger";
import { Table } from "../models/table.model";
import { Types } from 'mongoose';

/**
 * Lists all tables.
 * If the waiterOnly query parameter is set to true, only tables assigned to the current waiter are returned.
 * @param req The request.
 * @param res The response.
 * @returns The list of tables.
 */
export async function listTables(req: Request, res: Response) {
    logger.debug("Listing tables")
    try {
        const waiterOnly = req.query.waiterOnly ?? false

        const query = Table.find()

        if (waiterOnly === 'true') {
            const waiterId = req.userId
            if (!waiterId) {
                logger.warn("Error listing tables: No waiter ID")
                return res.status(400).json({ message: 'Invalid waiter ID' })
            }
            query.where('waiterId').equals(new Types.ObjectId(waiterId))
        }

        const tables = await query.exec()
        res.json(tables)
    } catch (error) {
        logger.error("Error listing tables: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * Assigns a table to the current waiter.
 * @param req The request.
 * @param res The response.
 * @returns The assigned table.
 */
export async function assignTable(req: Request, res: Response) {
    logger.debug("Assigning table: " + req.params.tableNumber)
    try {
        const table = await Table.findOne({ number: req.params.tableNumber })
        if (!table) {
            logger.warn("Error assigning table: Table not found")
            return res.status(404).json({ message: 'Table not found' })
        }

        const waiterId = req.userId
        if (!waiterId) {
            logger.warn("Error assigning table: No waiter ID")
            return res.status(400).json({ message: 'Invalid waiter ID' })
        }

        table.waiterId = new Types.ObjectId(waiterId);
        await table.save()

        res.json(table)
    } catch (error) {
        logger.error("Error assigning table: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * Occupies a table by setting its occupancy to the given people count.
 * @param req The request.
 * @param res The response.
 * @returns The occupied table.
 */
export async function occupyTable(req: Request, res: Response) {
    logger.debug("Occupying table: " + req.params.tableNumber + " with " + req.body.peopleCount + " people")
    try {
        const table = await Table.findOne({ number: req.params.tableNumber })
        if (!table) {
            logger.warn("Error occupying table: Table not found")
            return res.status(404).json({ message: 'Table not found' })
        }

        const peopleCount = req.body.peopleCount
        if (!peopleCount || peopleCount > table.seats || peopleCount < 0) {
            logger.warn("Error occupying table: Invalid people count: " + peopleCount)
            return res.status(400).json({ message: 'Invalid people count' })
        }

        table.occupancy = peopleCount
        await table.save()

        res.json(table)
    } catch (error) {
        logger.error("Error occupying table: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * Frees a table by setting its occupancy to 0.
 * @param req The request.
 * @param res The response.
 * @returns The freed table.
 */
export async function freeTable(req: Request, res: Response) {
    logger.debug("Freeing table: " + req.params.tableNumber)
    try {
        const table = await Table.findOne({ number: req.params.tableNumber })
        if (!table) {
            logger.warn("Error freeing table: Table not found: " + req.params.tableNumber)
            return res.status(404).json({ message: 'Table not found' })
        }

        table.occupancy = 0
        table.waiterId = null
        await table.save()

        res.json(table)
    } catch (error) {
        logger.error("Error freeing table: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
