const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Vote = new Schema({
    encryptedUserId: {type: String, required: true},
    surveyId: {type: String, required: true},
    candidateId: {type: String, required: true},
    note: int,
    noteMax: int,
    date: {type: Date, default: Date.now}
});
