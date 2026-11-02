import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { normalizeRegistrationInput } from "../utils/normalizeRegistrationInput.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = normalizeRegistrationInput(req.body);

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({ username, email, password });
    const createdUser = await User.findById(user._id).select("-password");

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };