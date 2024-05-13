const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db.sqlite'
});

const db = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Enable foreign key support
        await sequelize.query("PRAGMA foreign_keys = ON;");
        console.log('Foreign key support enabled');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {db, sequelize};
