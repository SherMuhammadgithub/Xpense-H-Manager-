const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, user_id } = req.body;

    try {
        if (!title || !amount || !category || !description || !date || !user_id) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }

        const expense = await Expense.create({
            user_id,
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: "Expense added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getExpense = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { category, sortBy } = req.query;
        
        let query = { user_id: userId };
        if (category) {
            query.category = category;
        }
        
        let sortOptions = [['createdAt', 'DESC']];
        
        if (sortBy === 'amount_asc') {
            sortOptions = [['amount', 'ASC']];
        } else if (sortBy === 'amount_desc') {
            sortOptions = [['amount', 'DESC']];
        }
        
        const expense = await Expense.findAll({ where: query, order: sortOptions });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.destroy({ where: { id: expenseId } });
        res.status(200).json({ message: "Expense deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}