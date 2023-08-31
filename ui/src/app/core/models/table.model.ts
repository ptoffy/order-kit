import { BaseModel } from "./base.model";

interface Table extends BaseModel {
    number: number
    seats: number
    occupancy: number
    waiterId?: string
    orders: string[]
}

export { Table };
