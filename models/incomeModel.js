const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/db.js');

const Income = sequelize.define('Income', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        defaultValue: 'income'
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
Income.sync();
module.exports = Income;