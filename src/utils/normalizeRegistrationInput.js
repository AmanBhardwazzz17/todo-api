import { ApiError } from "./ApiError.js";

const normalizeRegistrationInput = (body) => {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new ApiError(400, "Request body must be a JSON object");
    }

    const { username, email, password } = body;

    if (
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !username.trim() ||
        !email.trim() ||
        !password.trim()
    ) {
        throw new ApiError(400, "Username, email, and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        throw new ApiError(400, "A valid email address is required");
    }

    return {
        username: username.trim().toLowerCase(),
        email: normalizedEmail,
        password,
    };
};

export { normalizeRegistrationInput };
