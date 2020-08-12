const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Sending all the dishes to the user..');
})

.post((req, res) => {
    res.end('Adding the dish: ' + req.body.name + 'with details : ' + req.body.description)
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT oepration not supported on the /dishes')
})

.delete((req, res) => {
    res.end('Deleting all the dishes..')
});

// ===================================================================

dishRouter.route('/:dishId')

.get((req, res) => {
    res.end('Sending the details of the dish :' + req.params.dishId + '..');
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /dishes/' + req.params.dishId);
})

.put((req, res) => {
    res.write('Updating the dish with id :' + req. params.dishId + '\n');
    res.end('Updating the dish with name :' + req.body.name + ' with details : ' + req.body.description);
})

.delete((req, res) => {
    res.end('Deleting the dish :' + req.params.dishId);
});

module.exports = dishRouter;