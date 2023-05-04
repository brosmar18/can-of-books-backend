const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function clear () {
    try {
        await Book.deleteMany({});
        console.log('The Books are on Fire. Call 911!!');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.disconnect();
    }
}
