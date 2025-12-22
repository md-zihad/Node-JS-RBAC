const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json("Username and Password are required");
        }

        const userExist = await User.findOne({ username });

        if (userExist) {
            return res.status(409).json({
                message: "Username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await new User({
            username,
            password: hashedPassword,
            role,
        });

        await user.save();
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Register error: ", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const login = (req, res) => { };

module.exports = { register, login };
