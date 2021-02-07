const CandidateModel = require('./candidate.model');
const SurveyModel = require('../survey/survey.model');
const PERMISSION = require('../tools/permission');
const bcrypt = require('bcrypt');
const asyncLib = require('async');

module.exports = {
    createCandidate: async (req, res, next) => {
        //TODO validate user right
        //TODO validate data
        const reqCandidate = req.body.candidate;

        const candidate = new CandidateModel({
            title: reqCandidate.title,
            slug: reqCandidate.slug,
            surveyId: reqCandidate.surveyId,
            slogan: reqCandidate.slogan,
            description: reqCandidate.description,
            longDescription: reqCandidate.longDescription,
            currentVotes: [],
            archiveResults: [],
            opinions: [
                {
                    label: 'rejeter',
                    id: 'rejected',
                    color: '#e8554e'
                }, {
                    label: 'mauvais',
                    id: 'bad',
                    color: '#f19c65'
                }, {
                    label: 'neutre',
                    id: 'neutral',
                    color: '#ffd265'
                }, {
                    label: 'bien',
                    id: 'good',
                    color: '#2aa876'
                }, {
                    label: 'excellent',
                    id: 'excellent',
                    color: '#0a7b83'
                },
            ],
            images: reqCandidate.images,
            activate: reqCandidate.activate,
            creator: req.user.id,
            modified: Date.now(),
            created: Date.now(),
        });

        try {
            const savedCandidate = await candidate.save();
            res.status(201).json({candidate: savedCandidate});
        } catch (err) {
            next({status: 500, message: err});
        }
    },
    updateCandidate: async (req, res, next) => {
        const reqCandidate = req.body.candidate;
        if (!req.params.surveyId) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const actualSurvey = await SurveyModel.findById(req.params.surveyIdd);
                if (actualSurvey) {
                    if (SURVEY.canEditSurvey(req.user, actualSurvey)) {
                        const updateCandidate = await CandidateModel.updateOne({_id: reqCandidate.id}, {
                            $set: {
                                title: reqCandidate.title,
                                description: reqCandidate.description,
                                images: reqCandidate.images,
                                activate: reqCandidate.activate,
                                //TODO rest of the attributes of an candidate
                                modified: Date.now(),
                            }
                        });
                        res.status(200).json({message: "ok", candidate: updateCandidate});
                    } else {
                        next({status: 405, message: "not allowed"});
                    }
                } else {
                    next({status: 404, message: "not found"});
                }
            } catch (err) {
                console.log(err);
                if (err.name === 'MongoError' && err.code === 11000) {
                    next(new Error('There was a duplicate key error'));
                } else {
                    next({status: 500, message: err});
                }
            }
        }
    },
    getCandidate: async (req, res, next) => {
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const candidate = await CandidateModel.findById(req.params.id);
                if (candidate) {
                    if (SURVEY.canViewSurvey(req.user, survey)) {
                        res.status(200).json(survey);
                    } else {
                        next({status: 401, message: "Not allowed"});
                    }
                } else {
                    next({status: 404, message: "Not found"});
                }
            } catch (err) {
                console.log('survey error', err);
                next({status: 404, message: "not found"});
            }
        }
    },
    getCandidatesWithSurveyId: async (req, res, next) => {
        if (!req.params.surveyId) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const actualSurvey = await SurveyModel.findById(req.params.surveyId);
                if (actualSurvey) {
                    if (SURVEY.canEditSurvey(req.user, actualSurvey)) {
                        const candidates = await CandidateModel.find({surveyId: req.params.surveyId});
                        if (candidates) {
                            res.status(200).json(candidates);
                        } else {
                            next({status: 401, message: "Not found"});
                        }
                    } else {
                        next({status: 404, message: "Not allowed"});
                    }
                } else {
                    next({status: 404, message: "Not found"});
                }
            } catch (err) {
                console.log('survey error', err);
                next({status: 404, message: "not found"});
            }
        }
    },
    deleteCandidate: async (req, res, next) => {
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                //TODO control permission (get survey.admins or editors)
                const feedback = await CandidateModel.deleteOne({_id: req.params.id});
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
                    const result = PERMISSION.SURVEY.canAccessVotation(req.user, survey);
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
                    if (PERMISSION.canVoteCandidate(hashUserId, candidate, survey.reVoteDelay)) {
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
                    candidate.currentVotes.push({vote});
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
    deleteCandidateCurrentVotes: async (req, res, next) => {
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const candidate = await CandidateModel.findById(req.params.id);
                if (candidate) {
                    //TODO delete vote and save
                    //res.status(200).json({message: "vote deleted"});
                } else {
                    next({status: 500, message: "error"});
                }
            } catch (err) {
                next({status: 500, message: err});
            }
        }
    },
    deleteCurrentVotesOfUserId: (req, res, next) => {
    }
};
