const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((req, res, next) => {
    Promotions.find({})
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotions)
    }, err => next(err))
    .catch(err => next(err))
})

.post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, err => next(err))
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    req.statusCode = 403;
    res.end('PUT operation is not supported on /promotions');
})

.delete(authenticate.verifyUser, (req, res) => {
    Promotions.remove({})
    .then(promotion => {    
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, err => next(err))
    .catch(err => next(err));
})

// =================================================================

promoRouter.route('/:promoId')

.get((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, err => next(err))
    .catch(err => next(err));
})

.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /promotions/' + req.params.promoId);
})

.put(authenticate.verifyUser, (req, res) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set : req.body
    }, { new : true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, err => next(err))
    .catch(err => next(err));    
})

.delete(authenticate.verifyUser, (req, res) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(promotion);
    }, err => next(err))
    .catch(err => next(err));
})

module.exports = promoRouter;