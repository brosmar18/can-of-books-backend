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
    .then(() => console.log('Mongo DB is connected!'))
    .catch(e => console.log(e));
const Book = require('./models/book.js');
const PORT = process.env.PORT || 5005;
app.get('/', (request, response) => {
    response.status(200).send('Welcome!');
});
app.get('/books', getBooks);
async function getBooks(request, response, next) {
    try {
        let results = await Book.find();
        response.status(200).send(results);
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
