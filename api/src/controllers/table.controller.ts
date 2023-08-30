import { Request, Response } from 'express';
import logger from "../logger";
import { Table, TableType } from "../models/table.model";
import { Types } from 'mongoose';

// Get all tables
export async function listTables(req: Request, res: Response) {
    try {
        const tables = await Table.find()
        res.json(tables)
    } catch (error) {
        logger.error("Error listing tables: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Assign a waiter to a table
export async function assignTable(req: Request, res: Response) {
    try {
        const table = await Table.findById(req.params.id)
        if (!table) return res.status(404).json({ message: 'Table not found' })

        const waiterId = req.userId
        if (!waiterId) return res.status(400).json({ message: 'Invalid waiter ID' })

        table.waiterId = new Types.ObjectId(waiterId);
        await table.save()

        res.json(table)
    } catch (error) {
        logger.error("Error assigning table: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export async function occupyTable(req: Request, res: Response) {
    logger.debug("Occupying table: " + req.params.tableNumber + " with " + req.body.peopleCount + " people")
    try {
        const table = await Table.findOne({ number: req.params.tableNumber })
        if (!table) {
            logger.debug("Error occupying table: Table not found")
            return res.status(404).json({ message: 'Table not found' })
        }

        const peopleCount = req.body.peopleCount
        if (!peopleCount || peopleCount > table.seats || peopleCount < 0) {
            logger.debug("Error occupying table: Invalid people count: " + peopleCount)
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

export async function freeTable(req: Request, res: Response) {
    logger.debug("Freeing table: " + req.params.tableNumber)
    try {
        const table = await Table.findOne({ number: req.params.tableNumber })
        if (!table) return res.status(404).json({ message: 'Table not found' })

        table.occupancy = 0
        await table.save()

        res.json(table)
    } catch (error) {
        logger.error("Error freeing table: " + error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
