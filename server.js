'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');


mongoose.connect(
    process.env.DB_URL
)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(e => console.log(e));
const BookModel = require('./models/book.js');
const PORT = process.env.PORT || 5005;
app.get('/', (req, res) => {
    res.status(200).send('Welcome to our site!');
});
app.get('/books', getAllBooks);
async function getAllBooks(req, res, next) {
    try {
        let bookList = await BookModel.find();
        res.status(200).send(bookList);
    } catch (err) {
        next(err);
    }
}
app.get('*', (req, res) => {
    res.status(404).send('Resource not found');
});
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
