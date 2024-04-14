const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/db.js');
const User = require('./userModel.js');

const Expense = sequelize.define('Expense', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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