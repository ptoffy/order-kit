import { BaseModel } from "./base.model"

interface Table extends BaseModel {
    number: number
    seats: number
    occupancy: number
    waiterId?: { _id: string, username: string }
    orders: string[]
}

export { Table }
