const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end('Sending all the leaders to the user..')
})

.post((req, res) => {
    res.end('Adding the leader : ' + req.body.name);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /leaders');
})

.delete((req, res) => {
    res.end('Deleting all the leaders..');
})

leaderRouter.route('/:leaderId')

.get((req, res) => {
    res.end('Sending the details of the leader : ' + req.params.leaderId);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation is not supported on /leaders/' + req.params.leaderId);
})

.put((req, res) => {
    res.write('Updating the leader with id : ' + req.params.leaderId + '\n');
    res.end('Updating the leader with name :' + req.body.name);
})

.delete((req, res) => {
    res.end('Deleting the leader with id :' + req.params.leaderId);
})

module.exports = leaderRouter;
