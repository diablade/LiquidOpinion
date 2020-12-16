const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ImageSchema = new Schema({
    title: {type: String, required: true},
    format: {type: String, required: true},
    description: {type: String, required: false},
    filename: {type: String, required: true},
    path: {type: String, required: true},
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Image', ImageSchema);
