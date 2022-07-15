const mongoose = require('mongoose');
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
if (process.env.NODE_ENV === 'production') {
    db.url = process.env.MONGO_URI;
} else {
    db.url = 'mongodb://localhost:27017/test';
}
console.log('database uri:', db.url);

module.exports = db;