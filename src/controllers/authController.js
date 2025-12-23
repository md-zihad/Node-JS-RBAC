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

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json("Username are required");
        }

        const user = await User.findOne({ username }).select("+password");
        // Since I keep "select: fasle" in password attribute in User model, so Mongoose excluded this field when you query the model. That’s why bcrypt.compare(password, user.password) was throwing the Illegal arguments error.

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const token = await jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error("Register error: ", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { register, login };
