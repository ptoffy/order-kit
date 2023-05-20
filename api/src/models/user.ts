import mongoose from "mongoose";

enum UserRole {
    WAITER = "waiter",
    COOK = "cook",
    BARTENDER = "bartender",
    CASHER = "cashier"
}

interface UserType extends Document {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

const userSchema = new mongoose.Schema<UserType>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
});

const User = mongoose.model<UserType>("User", userSchema);

export { UserType, User, UserRole };