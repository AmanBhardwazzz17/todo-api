import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Todo } from "../models/todo.model.js";

const createTodo = asyncHandler(async (req, res) => {
    const { content } = req.body;
    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }
    const todo = await Todo.create({ content });
    return res.status(201).json(new ApiResponse(201, todo, "Todo created"));
});

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, todos, "Todos fetched"));
});

const toggleTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid todo id");
    }
    const todo = await Todo.findById(id);
    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }
    todo.isComplete = !todo.isComplete;
    await todo.save();
    return res.status(200).json(new ApiResponse(200, todo, "Todo updated"));
});

const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid todo id");
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Todo deleted"));
});

export { createTodo, getTodos, toggleTodo, deleteTodo };