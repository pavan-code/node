const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate')
const Leaders = require('../models/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/') 

.get((req, res, next) => {
    Leaders.find({})
    .then(leaders => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leaders);
    }, err => next(err))
    .catch(err => next(err));
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.create(req.body)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /leaders');
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Leaders.deleteMany({})
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leader) 
    }, err => next(err))
    .catch(err => next(err));
})

// =====================================================================

leaderRouter.route('/:leaderId')

.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /leaders/' + req.params.leaderId);
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId,
        { $set : req.body}, 
        { new : true})
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then(leader => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'applicaton/json');
        res.json(leader);
    }, err => next(err))
    .catch(err => next(err));
})

module.exports = leaderRouter;
