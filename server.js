'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.DB_URL
)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(e => console.log(e));

const BookModel = require('./models/book.js');
const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => response.status(200).send('Welcome to our site!'));
app.get('/books', getAllBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);

async function getAllBooks(req, res, next) {
    try {
        let bookList = await BookModel.find();
        res.status(200).send(bookList);
    } catch (err) {
        next(err);
    }
}

async function postBooks(request, response, next) {
    try {
        let createBook = await BookModel.create(request.body);
        response.status(200).send(createBook);
    } catch (error) {
        next(error);
    }
}

async function deleteBooks(request, response, next) {
    console.log(request.params.id);
    try {
        let id = request.params.id;
        await BookModel.findByIdAndDelete(id);
        response.status(200).send('Book was deleted.');
    } catch (error) {
        next(error);
    }
}

app.get('*', (request, response) => {
    response.status(404).send('Not available');
});

app.use((error, request, res, next) => {
    res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
