import { Schema, Document, Model, model } from "mongoose";
import { BaseModelType, BaseModel } from "./baseModel";

enum UserRole {
    WAITER = "waiter",
    COOK = "cook",
    BARTENDER = "bartender",
    CASHIER = "cashier"
}

interface UserType extends BaseModelType {
    username: string;
    password: string;
    name: string;
    role: UserRole;
    statistics: {
        orders?: number;
        revenue?: number;
    };
}

const userSchema = new Schema<UserType>({
    ...BaseModel.schema.obj,
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    statistics: {
        orders: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 }
    }
});

const User: Model<UserType> = model("User", userSchema);

export { UserType, User, UserRole };
