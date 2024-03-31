const sql = require('mssql');

const db = async () => {
    try {
        const pool = await sql.connect(process.env.CONNECTION_STRING);
        console.log('Db Connected');
        return pool;
    } catch (error) {
        console.error('DB Connection Error', error);
    }
}

module.exports = { db };