const {DataTypes} = require('sequelize');
const {sequelize} = require('../db/db.js');

const Notification = sequelize.define('Notification', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: 'id'
        }
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Seen:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }});
Notification.sync();
module.exports = Notification;