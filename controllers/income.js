const incomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date, user } = req.body;

    const income = incomeSchema({
        user, // this is an instance of the incomeSchema model
        title,
        amount,
        category,
        description,
        date
    })

    try {
        // validations
        if (!title || !amount || !category || !description || !date || !user) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || !amount === 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }
        await income.save();
        res.status(200).json({ message: "Income added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getIncome = async (req, res) => {
    try {
        const userId = req.params.userId;
        const income = await incomeSchema.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        await incomeSchema.findByIdAndDelete(incomeId);
        res.status(200).json({ message: "Income deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}