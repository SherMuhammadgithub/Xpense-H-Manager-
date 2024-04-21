const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/db.js');
const {User} = require('./userModel.js');
const {Category} = require('./CategoryModel.js');

const Income = sequelize.define('Income', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TotalAmount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING,
        defaultValue: 'income'
    },
    ReceivedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
Income.sync();
module.exports = Income;