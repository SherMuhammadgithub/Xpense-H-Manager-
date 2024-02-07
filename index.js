const express = require('express');
const cors = require('cors');
const { db } = require('./db/db.js');
const { fs, readdirSync } = require('fs');

const app = express();

require('dotenv').config(); // to use .env file
const PORT = process.env.PORT || 3000; 

// middlewares

app.use(express.json()); // to parse json data
app.use(cors()); // to avoid cors error


// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route))) // to use all routes from routes folder
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}


server();