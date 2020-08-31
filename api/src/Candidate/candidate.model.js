const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let vote = {
    hashUserId: {type: String, required: true},
    note: Number,
    noteMax: Number,
    date: {type: Date, default: Date.now}
}

let CandidateSchema = new Schema({
    title: {type: String, required: true},
    surveyId: {type: String, required: true},
    description: {type: String, required: false},
    votes: {type: [vote], required: false},
    noteMax: {type: Number, default: 5, required: true},
    images: [{type: String, url: String}],
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Candidate', CandidateSchema);
