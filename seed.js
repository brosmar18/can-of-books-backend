'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const BookModel = require('./models/book');

async function runSeed() {
    await mongoose.connect(
        process.env.DB_URL
    )
        .then(() => console.log('MongoDB connected successfully!'))
        .catch(e => console.log(e));

    await BookModel.create([{
        title: 'Watchmen',
        description: 'A tale of superheroes and vigilantes.',
        status: true
    }]);
    console.log('Book 1 added!')

    await BookModel.create([{
        title: '20,000 Leagues Under The Sea',
        description: 'A journey to the depths of the ocean.',
        status: true
    }]);
    console.log('Book 2 added!')

    await BookModel.create([{
        title: '1984',
        description: 'A dystopian novel about surveillance and control.',
        status: true
    }]);
    console.log('Book 3 added!')

    console.log('Closing the DB connection for the seed file');
    mongoose.disconnect();
}

runSeed();
