const CandidateModel = require('../candidate/candidate.model');
const {SURVEY, VOTE} = require('../tools/permission');
const bcrypt = require('bcrypt');
const asyncLib = require('async');

// let Vote = new Schema({
//     note: {type: Note, required: true},
//     date: {type: Date, default: Date.now}
// });

// let Note = new Schema({
//     level: int,
//     count: int
// });

module.exports = {
    vote: async (req, res, next) => {
        asyncLib.waterfall([
                function checkNull(done) {
                    if (req.body.vote.surveyId && req.body.vote.candidateId && req.body.vote.note) {
                        done(null, req);
                    } else {
                        done({status: 500, message: 'vote error'});
                    }
                },
                async function getSurvey(req, done) {
                    const survey = await SurveyModel.findById(req.body.vote.surveyId);
                    if (survey) {
                        done(null, survey);
                    } else {
                        done({status: 404, message: "Not found"});
                    }
                },
                function canAccessVote(survey, done) {
                    const result = VOTE.canAccessVotation(req.user, survey);
                    if (result.can) {
                        done(null, survey);
                    } else {
                        done({status: 401, message: result.why});
                    }
                },
                async function getCandidate(survey, done) {
                    const candidate = await CandidateModel.findById(req.body.vote.candidateId);
                    if (candidate) {
                        done(null, survey, candidate);
                    } else {
                        done({status: 404, message: "Not found"});
                    }
                },
                function hashUserId(survey, candidate, done) {
                    try {
                        const salt = bcrypt.genSaltSync(parseInt(process.env.SECURITY_SALT_USERID));
                        const hashUserId = bcrypt.hashSync(req.user.id, salt);
                        done(null, survey, candidate, hashUserId);
                    } catch (err) {
                        console.log(err);
                        done({status: 500, message: 'hash error'});
                    }
                },
                function canVote(survey, candidate, hashUserId, done) {
                    if (VOTE.allowDelayVote(hashUserId, candidate, survey.reVoteDelay)) {
                        done(null, candidate, hashUserId);
                    } else {
                        done({status: 401, message: "Not allowed"});
                    }
                },
                function addVote(candidate, hashUserId, done) {
                    const vote = {
                        encryptedUserId: hashUserId,
                        note: req.body.vote.note,
                        noteMax: req.body.vote.noteMax,
                        date: {type: Date, default: Date.now}
                    };
                    candidate.votes.push({vote});
                    done(null, candidate);
                },
                async function saveCandidate(candidate, done) {
                    await candidate.save()
                        .then(voteSaved => {
                            done(null, voteSaved);
                        })
                        .catch(err => {
                            console.log(err);
                            done({status: 500, message: 'save error'});
                        });
                }
            ],
            function (err, vote) {
                if (err) {
                    let error = new Error(err.message);
                    error.status = err.status;
                    next(error);
                } else if (vote) {
                    res.status(201).json({"vote": "done"});
                }
            });
    },
    getLastDateVotesByCandidateId: async (req, res, next) => {
        if (!req.params.candidatId && !req.params.surveyId) {
            next({status: 400, message: "bad request"});
        } else {
            if (SURVEY.canViewSurvey(req.user, survey)) {
                try {
                    var d = new Date();
                    d.setMonth(d.getMonth() - 1); //1 month ago
                    const votes = await VoteModel.find({
                        date: {$gte: d},
                        surveyId: req.params.surveyId,
                        candidatesId: req.params.candidateId
                    });
                    if (votes) {
                        res.status(200).json(survey);

                    } else {
                        next({status: 404, message: "Not found"});
                    }
                } catch (err) {
                    console.log('survey error', err);
                    next({status: 404, message: "not found"});
                }
            } else {
                next({status: 401, message: "Not allowed"});
            }
        }
    },
    deleteAllVotesByCandidateId: async (req, res, next) => {
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const feedback = await SurveyModel.deleteOne({_id: req.params.id});
                if (feedback.ok) {
                    res.status(200).json({message: "deleted"});
                } else {
                    next({status: 500, message: "error"});
                }
            } catch (err) {
                next({status: 500, message: err});
            }
        }
    },
    delelteAllVotesByUserId: (req, res, next) => {

    }
};
