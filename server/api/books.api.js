let express = require('express');
let router = express.Router();

let BooksService = require('../services/books.service');

router.get('/', (req, res) => {
    BooksService.get()
        .then((books) => {
            res.send(books);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.post('/', (req, res) => {
    BooksService.insertNewBook(req.body)
        .then((newBook) => {
            res.send(newBook);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.get('/:id', (req, res) => {
    BooksService.get('WHERE books.id=$1', [req.params.id])
        .then((book) => {
            res.send(book);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.put('/:id', (req, res) => {
    BooksService.updateBook(req.params.id, req.body)
        .then((updatedBook) => {
            res.send(updatedBook);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.delete('/:id', (req, res) => {
    BooksService.deleteBook(req.params.id)
        .then((response) => {
            res.send(response);
        }, (err) => {
            res.status(500).send(err);
        });
});

module.exports = router;