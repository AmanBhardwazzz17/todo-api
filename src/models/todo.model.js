import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        content: { type: String, required: true, trim: true },
        isComplete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);