const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/db.js');

const Goals = sequelize.define('Goals', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Category",
            key: 'id'
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    amount:{
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
});
Goals.sync();
module.exports = Goals;
