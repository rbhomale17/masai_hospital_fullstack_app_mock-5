const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB_URL = process.env.mongoDB_URL;

const connection = mongoose.connect(mongoDB_URL);

module.exports = connection;