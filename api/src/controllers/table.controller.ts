import { Request, Response } from 'express';
import logger from "../logger";
import { Table } from "../models/table.model";
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
