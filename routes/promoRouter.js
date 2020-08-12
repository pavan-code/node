const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Sending all the promotions to the user..;')
})

.post((req, res) => {
    res.end('Adding the promotion : ' + req.body.name);
})

.put((req, res) => {
    req.statusCode = 403;
    res.end('PUT operation is not supported on /promotions')
})

.delete((req, res) => {
    res.end('Deleting all the promotions..');
})

// =================================================================

promoRouter.route('/:promoId')

.get((req, res) => {
    res.end('Sending the details of the promotion : ' + req.params.promoId);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /promotions/' + req.params.promoId);
})

.put((req, res) => {
    res.write('Updating the promotion with id : ' + req.params.promoId + '\n');
    res.end('Updating the promotion with name: ' + req.body.name);
})

.delete((req, res) => {
    res.end('Deleteing the promotion with id : ' + req.params.promoId);
})

module.exports = promoRouter;