import { Router } from "express";
import { createTodo, getTodos, toggleTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/").post(createTodo).get(getTodos);
router.route("/:id").patch(toggleTodo).delete(deleteTodo);

export default router;