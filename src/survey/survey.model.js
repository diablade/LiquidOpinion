const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

let member = {
    id: String,
    username: String
}

let Survey = new Schema({
    title: {type: String, required: true},
    creator: {type: member, required: true},
    description: {type: String, required: true},
    theme: {type: String, required: true},
    tags: {type: [String], required: true, default: []},
    members: {type: [member], default: []},
    editors: {type: [member], default: []},
    admins: {type: [member], required: true},
    candidatesIds: {type: [String], required: false},
    images: [{type: String, url: String}],
    activate: {type: Boolean, default: false},
    visibleBySearch: {type: Boolean, default: false},
    isPrivate: {type: Boolean, default: false},
    noteMax: {type: String, default: 5, required: true},
    typeOfVote: {type: String, required: true, default: "num"},
    noteLabels: {type: [String], required: false},
    delayReVote: {type: String, default: 'P1D'},
    expireAt: {type: Date, required: false},
    selfDestruct: {type: Date, required: false},
    modified: {type: Date, default: Date.now, required: true},
    created: {type: Date, default: Date.now, required: true},
});

module.exports = mongoose.model('Survey', Survey);
