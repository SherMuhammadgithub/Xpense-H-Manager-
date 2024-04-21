const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/db.js');
const User = require('./userModel.js');

const Expense = sequelize.define('Expense', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Category',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'Expense'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
Expense.sync();
module.exports = Expense;