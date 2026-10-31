import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const registerSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(72, "Password must be at most 72 characters"),
});

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(1),
});

const signToken = (userId) =>
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const formatUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
});

export const registerUser = async (req, res) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: parsed.error.issues[0].message,
            });
        }

        const { name, email, password } = parsed.data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }

        // Password is hashed by the pre-save hook in the User model
        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token: signToken(user._id),
            user: formatUser(user),
        });
    } catch (error) {
        // Two simultaneous signups with the same email can slip past findOne
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered",
            });
        }
        console.error("Register error:", error);
        res.status(500).json({ success: false, message: "Registration failed" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "A valid email and password are required",
            });
        }

        const { email, password } = parsed.data;

        const user = await User.findOne({ email }).select("+password");
        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: signToken(user._id),
            user: formatUser(user),
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
};

export const getMe = async (req, res) => {
    try {
        res.status(200).json({ success: true, user: formatUser(req.user) });
    } catch (error) {
        console.error("GetMe error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user" });
    }
};