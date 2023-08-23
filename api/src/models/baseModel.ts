import mongoose, { Schema, Types } from "mongoose";

// This is the base model that all other models will inherit from.
interface BaseModelType extends mongoose.Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const baseSchema = new mongoose.Schema<BaseModelType>(
    {
        _id: { type: Schema.Types.ObjectId, required: true }
    },
    {
        timestamps: true
    }
);

const BaseModel = mongoose.model<BaseModelType>("BaseModel", baseSchema);

export { BaseModel, BaseModelType };