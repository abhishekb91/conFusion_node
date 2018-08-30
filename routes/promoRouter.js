var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/Promotions');
var Verify = require('./verify');

var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post([Verify.verifyOrdinaryUser, Verify.verifyAdmin], function (req, res, next) {
    Promotions.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete([Verify.verifyOrdinaryUser, Verify.verifyAdmin], function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

promotionRouter.route('/:promotionId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.findById(req.params.promotionId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put([Verify.verifyOrdinaryUser, Verify.verifyAdmin], function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete([Verify.verifyOrdinaryUser, Verify.verifyAdmin], function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {        
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promotionRouter