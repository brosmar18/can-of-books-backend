'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');
async function seed() {
    await mongoose.connect(
        process.env.DB_URL
    )
        .then(() => console.log('Mongo DB is connected!'))
        .catch(e => console.log(e));
    await Book.create([{
        title: 'Watchmen',
        description: 'Who watches who?',
        status: true
    }]);
    console.log('Book 1!!')
    await Book.create([{
        title: '20,000 Leagues Under The Sea',
        description: 'Who watches who?',
        status: true
    }]);
    console.log('Book 2!!')
    await Book.create([{
        title: '1984',
        description: 'Who watches who?',
        status: true
    }]);
    console.log('Book 3!!')
    console.log('Closing the DB connection for our seed file');
    mongoose.disconnect();
}
seed();
