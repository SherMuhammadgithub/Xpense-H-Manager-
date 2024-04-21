const Expense = require("../models/expenseModel");
const Category = require("../models/CategoryModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, user_id } = req.body;

    try {
        if (!title || !amount || !category || !description || !date || !user_id) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }
        // Get category id from category model
        const categoryData = await Category.findOne({ where: { name: category }, attributes: ['id']});
        if (!categoryData) {
            return res.status(400).json({ message: "Category does not exist" })
        }
        const category_id = categoryData.get('id');
        const expense = await Expense.create({
            user_id,
            category_id,
            title,
            amount,
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
        if (category){
            let CategoryInstance = await Category.findOne({ where: { name: category }, attributes: ['id']});
        }
        if (CategoryInstance) {
            query.category_id = CategoryInstance.get('id');
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