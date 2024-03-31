const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date, user_id } = req.body;

    try {
        // validations
        if (!title || !amount || !category || !description || !date || !user_id) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }

        const income = await Income.create({
            user_id,
            title,
            amount,
            category,
            description,
            date
        });

        res.status(200).json({ message: "Income added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getIncome = async (req, res) => {
    try {
        const userId = req.params.userId;
        const income = await Income.findAll({ where: { user_id: userId }, order: [['createdAt', 'DESC']] });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        await Income.destroy({ where: { id: incomeId } });
        res.status(200).json({ message: "Income deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}