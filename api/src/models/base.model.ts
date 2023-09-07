import mongoose, { Schema, Types } from "mongoose"

/**
 * Base model type all models should extend.
 */
export interface BaseModelType extends mongoose.Document {
    _id: Types.ObjectId
}
