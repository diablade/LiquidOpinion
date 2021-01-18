const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

let member = {
    id: String,
    username: String,
    photo: String,
}

let image = {
    format: String,
    url: String,
}

let opinion = {
    label: String,
    color: String,
    id: String,
}

let Survey = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    creator: {type: member, required: true},
    slogan: {type: String, required: true},
    description: {type: String, required: true},
    themes: {type: [String], required: true, default: []},
    tags: {type: [String], required: true, default: []},
    members: {type: [member], default: []},
    editors: {type: [member], default: []},
    admins: {type: [member], required: true},
    candidatesIds: {type: [String], required: false},
    images: [{format: String, url: String}],
    activate: {type: Boolean, default: false},
    visibleBySearch: {type: Boolean, default: false},
    isPrivate: {type: Boolean, default: false},
    typeOfVote: {type: String, required: true, default: "num"},
    opinionsDefault: { type: [opinion], require: true, default: [
        {label: 'rejeter',id: 'rejected',color: '#e8554e'},
        {label: 'mauvais', id: 'bad', color: '#f19c65'},
        {label: 'neutre', id: 'neutral', color: '#ffd265'},
        {label: 'bien', id: 'good', color: '#2aa876'},
        {label: 'excellent', id: 'excellent', color: '#0a7b83'},]},
    reVoteDelay: {type: String, default: 'P1D'},
    expireAt: {type: Date, required: false},
    selfDestruct: {type: Date, required: false},
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Survey', Survey);
