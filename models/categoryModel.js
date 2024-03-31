const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = Category;