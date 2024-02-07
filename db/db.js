const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false) // to avoid deprecation warning
        await mongoose.connect(process.env.MONGO_URL) // connect to db
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error');
    }
}

module.exports = { db };