const Income = require("../models/incomeModel");
const Category = require("../models/CategoryModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category_id, description, date, user_id } = req.body;

    try {
        if (!title || !amount || !category_id || !description || !date || !user_id) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }

        const income = await Income.create({
            user_id,
            title,
            amount,
            category_id,
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
        const { category_id, sortBy } = req.query;
        
        let query = { user_id: userId };
        if (category_id) {
            query.category_id = category_id;
        }
        
        let sortOptions = [['createdAt', 'DESC']];
        
        if (sortBy === 'amount_asc') {
            sortOptions = [['amount', 'ASC']];
        } else if (sortBy === 'amount_desc') {
            sortOptions = [['amount', 'DESC']];
        }
        
        const income = await Income.findAll({ where: query, order: sortOptions });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
exports.updateIncome = async(req,res) => {
    const { title, amount, category_id, description, date, user_id } = req.body;
    const incomeId = req.params.id;
    try {
        if (!title || !amount || !category_id || !description || !date || !user_id) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }
        await Income.update({
            user_id,
            title,
            amount,
            category_id,
            description,
            date
        }, { where: { id: incomeId } });

        res.status(200).json({ message: "Income updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
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