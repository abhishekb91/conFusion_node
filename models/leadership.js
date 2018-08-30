// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    abbr: {
        type: String,
        default: ''
    },
    designation: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leaderships = mongoose.model('Leadership', leadershipSchema);

// make this available to our Node applications
module.exports = Leaderships;