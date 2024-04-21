const Goals = require('../models/GoalsModel');

exports.addGoal = async (req, res) => {
    const {category_id, amount ,description, title} = req.body;
    try {
        if (!category_id || !amount || !description,!title) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const goal = await Goals.create({
            category_id,
            title,
            amount,
            description
        });
        res.status(200).json({ message: "Goal added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error"})
    }}

exports.getGoal = async (req, res) => {
    try {
        const category_id = req.params.id;
        
        let query = { category_id: category_id };
        let sortOptions = [['createdAt', 'DESC']];
        const goal = await Goals.findAll({ where: query, order: sortOptions });
        res.status(200).json(goal);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateGoal = async(req,res) => {
    const {category_id, amount ,description, title, id} = req.body;
    try {
        if (!category_id || !amount || !description,title) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (amount < 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount cannot be negative" })
        }
        const goal = await Goals.update({
            category_id,
            title,
            amount,
            description
        }, { where: { id } });
        res.status(200).json({ message: "Goal updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goals.destroy({ where: { id } });
        if (goal) {
            res.status(200).json({ message: "Goal deleted successfully" });
        } else {
            res.status(400).json({ message: "Goal not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}