import { BaseModel } from "src/app/core/models/base.model"

enum UserRole {
    Waiter = "waiter",
    Cook = "cook",
    Bartender = "bartender",
    Cashier = "cashier"
}

interface User extends BaseModel {
    _id: string
    username: string
    password: string
    name: string
    role: UserRole
    statistics: {
        orders: number
        revenue: number
    };
}

export { User, UserRole }
