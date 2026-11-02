import express from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";
import userRoutes from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js"; 

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(fileURLToPath(new URL("../public", import.meta.url))));

// routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/todos", todoRouter);         


app.use((err, req, res, next) => {
    const isDuplicateKeyError = err.code === 11000;
    const errorStatus = err.statusCode ?? err.status;
    const statusCode = isDuplicateKeyError
        ? 409
        : Number.isInteger(errorStatus) && errorStatus >= 400 && errorStatus < 600
          ? errorStatus
          : 500;
    const message = isDuplicateKeyError
        ? "User with this email or username already exists"
        : statusCode === 400 && err.type === "entity.parse.failed"
          ? "Invalid JSON request body"
          : err.message || "Internal Server Error";

    if (statusCode === 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export { app };
