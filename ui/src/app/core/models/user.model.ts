import { BaseModel } from "src/app/core/models/base.model";

enum UserRole {
    WAITER = "waiter",
    COOK = "cook",
    BARTENDER = "bartender",
    CASHIER = "cashier"
}

interface User extends BaseModel {
    username: string;
    name: string;
    role: UserRole;
    statistics: {
        orders?: number;
        revenue?: number;
    };
}

export { User, UserRole };
