const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let vote = {
    hashUserId: {type: String, required: true},
    note: int,
    noteMax: int,
    date: {type: Date, default: Date.now}
}

let Candidate = new Schema({
    title: {type: String, required: true},
    surveyId: {type: String, required: true},
    description: {type: String, required: false},
    votes: {type: [vote], required: false},
    noteMax: {type: String, default: 5, required: true},
    images: [{type: String, url: String}],
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});
