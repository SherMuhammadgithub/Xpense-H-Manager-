const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");


exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" })
        }
        await userSchema.create({ name, email, password });
        res.status(200).json({ message: "User signed up successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        res.status(200).json({ message: "User signed in successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.changePass = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        // User will not explicitly provide his email it will be fetched from the token
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}