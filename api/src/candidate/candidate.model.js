const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let vote = {
    hashUserId: String,
    idOfOpinion: String,
    last: Date,
}

let opinion = {
    id:    String,
    label: String,
    color: String,
}

let note = {
    idOfOpinion: String,
    result: Number,
}

let image = {
    format: String,
    url:    String,
}

let CandidateSchema = new Schema({
    title: {type: String, required: true},
    surveyId: {type: String, required: true},
    description: {type: String, required: false},
    longDescription: {type: String, required: false},
    currentVotes: {type: [vote], required: false},//TODO HASHSET !!!
    archiveResults: [{
        date:  {type: Date, required: true},
        results: {type: [note],required: true},
    }],
    noteMax: {type: Number, default: 5, required: true},
    opinions: {
        type:    [opinion],
        require: true,
        default: [
            {label:    'rejeter',
                id:    'rejected',
                color: '#e8554e'
            }, {
                label: 'mauvais',
                id:    'bad',
                color: '#f19c65'
            }, {
                label: 'neutre',
                id:    'neutral',
                color: '#ffd265'
            }, {
                label: 'bien',
                id:    'good',
                color: '#2aa876'
            }, {
                label: 'excellent',
                id:    'excellent',
                color: '#0a7b83'
            },
        ]
    },
    images: {type: [image], default: []},
    modified: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Candidate', CandidateSchema);
