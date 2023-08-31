import mongoose, { Schema, Types } from "mongoose"

/**
 * Base model type all models should extend.
 */
interface BaseModelType extends mongoose.Document {
    _id: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const baseSchema = new mongoose.Schema<BaseModelType>({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
})

export { baseSchema, BaseModelType }
