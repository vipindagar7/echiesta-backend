import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/passwordHash.js";
import { sendAccountCreatedMail, sendVerifiedMail } from "../utils/sendMail.js";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Create token (include role)
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,          // MUST for HTTPS
            sameSite: "None",      // MUST for cross-site
            path: "/",
        });
        
        res.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,

            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const hashedPassword = await hashPassword(password)
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        } 

        const user = await userModel.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
        })
        await sendAccountCreatedMail(user, password)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({
            message: error,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await userModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            message: error,
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password").lean();
        res.status(200).json({
            message: "user fetched success",
            data: users
        })
    } catch (error) {
        console.error("Create user error:", error);
        res.status(500).json({
            message: err,
        });
    }
};

export const logoutController = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};