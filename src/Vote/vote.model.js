const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// let Vote = new Schema({
//     note: {type: Note, required: true},
//     date: {type: Date, default: Date.now}
// });

// let Note = new Schema({
//     level: int,
//     count: int
// });

let Vote = new Schema({
    userId: {type: String, required: true},
    surveyId: {type: String, required: true},
    candidatId: {type: String, required: true},
    note: int,
    date: {type: Date, default: Date.now}
});
