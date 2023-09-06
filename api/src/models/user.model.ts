import { Schema, Model, model } from "mongoose"
import { BaseModelType } from "./base.model"

export enum UserRole {
    Waiter = "waiter",
    Cook = "cook",
    Bartender = "bartender",
    Cashier = "cashier"
}

export interface UserType extends BaseModelType {
    username: string
    password: string
    name: string
    role: UserRole
    statistics: {
        orders: number
        revenue: number
    }
}

export const userSchema = new Schema<UserType>({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    statistics: {
        orders: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 }
    }
}, { timestamps: true })

export const User: Model<UserType> = model("User", userSchema)
