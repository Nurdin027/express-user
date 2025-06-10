const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.DB_URL;

mongoose.connect(MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });