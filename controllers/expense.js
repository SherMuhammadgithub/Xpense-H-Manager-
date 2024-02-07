



const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, user } = req.body; // this is an instance of the ExpenseSchema model

    const expense = ExpenseSchema({
        user, 
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
        if (amount < 0 || amount !== Number(amount)) {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }
        await expense.save();
        res.status(200).json({ message: "expense added successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getExpense = async (req, res) => { 
    try {
        const userId = req.params.userId;
        const expense = await ExpenseSchema.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await ExpenseSchema.findByIdAndDelete(expenseId);
        res.status(200).json({ message: "expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}