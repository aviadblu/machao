let express = require('express');
let router = express.Router();

let CategoriesService = require('../services/categories.service');

router.get('/', (req, res) => {
    CategoriesService.get()
        .then((categories) => {
            res.send(categories);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.post('/', (req, res) => {
    CategoriesService.insertNewCategory(req.body)
        .then((newCategory) => {
            res.send(newCategory);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.get('/:id', (req, res) => {
    CategoriesService.get('WHERE id=$1', [req.params.id])
        .then((category) => {
            res.send(category);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.put('/:id', (req, res) => {
    CategoriesService.updateCategory(req.params.id, req.body)
        .then((updatedCategory) => {
            res.send(updatedCategory);
        }, (err) => {
            res.status(500).send(err);
        });
});

router.delete('/:id', (req, res) => {
    CategoriesService.deleteCategory(req.params.id)
        .then((response) => {
            res.send(response);
        }, (err) => {
            res.status(500).send(err);
        });
});

module.exports = router;