var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaderships = require('../models/leadership');

var leadershipRouter = express.Router();
leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.get(function (req, res, next) {
    Leaderships.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(function (req, res, next) {
    Leaderships.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Leaderships.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leadershipRouter.route('/:leadershipId')
.get(function (req, res, next) {
    Leaderships.findById(req.params.leadershipId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function (req, res, next) {
    Leaderships.findByIdAndUpdate(req.params.leadershipId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function (req, res, next) {
    Leaderships.findByIdAndRemove(req.params.leadershipId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leadershipRouter;