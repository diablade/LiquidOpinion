const CandidateModel = require('./candidate.model');
const SurveyModel = require('../survey/survey.model');
const {SURVEY, ROLE} = require('../tools/permission');

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
        const reqCandidate = req.body.survey;
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const actualSurvey = await SurveyModel.findById(req.params.id);
                if (actualSurvey) {
                    if (SURVEY.canEditSurvey(req.user, actualSurvey)) {
                        if (req.user.role === ROLE.ADMIN && !reqCandidate.admins || reqCandidate.admins.length === 0) {
                            reqCandidate.admins = [{id: req.user.id, username: req.user.username}];
                        }

                        await CandidateModel.updateOne({_id: req.params.id}, {
                            $set: {
                                title: reqCandidate.title,
                                description: reqCandidate.description,
                                images: reqCandidate.images,
                                activate: reqCandidate.activate,
                                modified: Date.now(),
                            }
                        });
                        res.status(200).json({message: "ok"});
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
}
;
