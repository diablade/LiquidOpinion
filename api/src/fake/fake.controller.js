var faker = require('faker/locale/fr');
var moment = require('moment');
var _ = require('lodash');
const log = require('../../config/log');
const asyncLib = require('async');

const UserModel = require('../user/user.model');
const SurveyModel = require('../survey/survey.model');
const CandidateModel = require('../candidate/candidate.model');

function fakeCurrentVotes(nbVotants, opinions) {
    var votes = [];
    for (let i = 0; i < nbVotants; i++) {
        votes.push({
            idOfOpinion: opinions[faker.random.number(opinions.length() - 1)].id,
            hashUserId: faker.random.uuid,
            last: moment().subtract(faker.random.number(10) + 1, 'days'),
        });
    }
}

function fakeArchiveResults(days, opinions) {
    var notes = [];
    for (let i = 0; i < days; i++) {
        var results = [];
        for (var op of opinions) {
            results.push({
                idOfOpinion: op.id,
                result: faker.random.number(10000)
            });
        }
        notes.push({
            date: moment().subtract(i + 1, 'days'),
            results: results
        });
    }
    return notes;
}


module.exports = {
    removeAll: async (req, res, next) => {
        log.info('strat');
        UserModel.remove();
        SurveyModel.remove();
        CandidateModel.remove();
        log.info('end');
        next({status: 200, ok: 'ok'});
    },
};
