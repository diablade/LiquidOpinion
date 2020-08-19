const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Candidat = new Schema({
    title: {type: String, required: true},
    surveyId: {type: String, required: true},
    description: {type: String, required: true},
    images: [{type: String, url: String}],
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});
