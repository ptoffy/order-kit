import { Schema, Document, Model, model } from "mongoose";
import { BaseModelType, baseSchema } from "./base.model";
import { IsString, IsNotEmpty, Length, IsIn } from 'class-validator';

enum UserRole {
    Waiter = "waiter",
    Cook = "cook",
    Bartender = "bartender",
    Cashier = "cashier"
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

class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsIn(Object.values(UserRole))
    role!: UserRole;
}

const userSchema = new Schema<UserType>({
    ...baseSchema.obj,
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
