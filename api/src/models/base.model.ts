import mongoose, { Schema, Types } from "mongoose"

/**
 * Base model type all models should extend.
 */
interface BaseModelType extends mongoose.Document {
    _id: Types.ObjectId
}

const baseSchema = new mongoose.Schema<BaseModelType>({
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
},
    { timestamps: true }
)

const Base = mongoose.model<BaseModelType>('Base', baseSchema)

export { baseSchema, BaseModelType, Base }
