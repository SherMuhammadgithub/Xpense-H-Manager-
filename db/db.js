const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db.sqlite'
});

const db = async() =>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = {db, sequelize};