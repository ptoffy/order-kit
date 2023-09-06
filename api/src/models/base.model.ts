import mongoose, { Schema, Types } from "mongoose"

/**
 * Base model type all models should extend.
 */
export interface BaseModelType extends mongoose.Document {
    _id: Types.ObjectId
}

export const baseSchema = new mongoose.Schema<BaseModelType>({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
},
    { timestamps: true }
)

export const Base = mongoose.model<BaseModelType>('Base', baseSchema)
