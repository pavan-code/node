const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get((req, res, next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dishes)
    }, err => next(err))
    .catch(err => next(err));
})

.post((req, res, next) => {    
    Dishes.create(req.body)
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json')
        console.log("dish created : ", dish);
        res.json(dish);
    }, err => next(err))
    .catch(err => next(err));
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT oepration not supported on the /dishes')
})

.delete((req, res, next) => {
    Dishes.remove({})
    .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result);
    }, err => next(err))
    .catch(err => next(err));
});

// ===================================================================

dishRouter.route('/:dishId')

.get((req, res, next) => {
    // res.end('Sending the details of the dish :' + req.params.dishId + '..');
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish)
    }, err => next(err))
    .catch(err => next(err));
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /dishes/' + req.params.dishId);
})

.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set : req.body
    }, { new : true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish)
    }, err => next(err))
    .catch(err => next(err));
})

.delete((req, res) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(result)
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = dishRouter;