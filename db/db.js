const { Sequelize } = require('sequelize');
const config = {
  user: '',
  password: '',
  server: 'localhost\\SQLEXPRESS', 
  database: 'Xpense', 
  options: {
    encrypt: true, 
    trustServerCertificate: true 
  }
};

const sequelize = new Sequelize('mssql://localhost\\SQLEXPRESS/Xpense',{
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        instanceName: 'SQLEXPRESS'
        }
    }

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