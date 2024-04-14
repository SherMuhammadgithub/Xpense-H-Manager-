const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signUp = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" })
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(200).json({ message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }

}
exports.signIn = async(req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({where:{email:email}}).catch(err=>{
            console.log("Error: ",err.message)
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        res.status(200).json({ message: `User logged in successfully`, user: { id: user.id, email: user.email, password: user.password,name: user.name } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.changePass = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
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