const userSchema = require("../models/userModel");


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
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        res.status(200).json({ message: "User signed in successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}