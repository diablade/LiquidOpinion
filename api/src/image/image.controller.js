const CandidateModel = require('./candidate.model');
const {SURVEY, ROLE} = require('../tools/permission');

module.exports = {
    createCandidate: async (req, res, next) => {
        //TODO validate data
        const reqSurvey = req.body.survey;
        if (!reqSurvey.admins || reqSurvey.admins.length === 0) {
            reqSurvey.admins = [{id: req.user.id, username: req.user.username}];
        }
        if (!reqSurvey.members || reqSurvey.members.length === 0) {
            reqSurvey.members = [{id: req.user.id, username: req.user.username}];
        }
        const survey = new SurveyModel({
            title: reqSurvey.title,
            creator: {id: req.user.id, username: req.user.username},
            description: reqSurvey.description,
            theme: reqSurvey.theme,
            tags: reqSurvey.tags,
            members: reqSurvey.members,
            editors: reqSurvey.editors,
            admins: reqSurvey.admins,
            candidatesIds: reqSurvey.candidatesIds,
            images: reqSurvey.images,
            activate: reqSurvey.activate,
            visibleBySearch: reqSurvey.visibleBySearch,
            isPrivate: reqSurvey.isPrivate,
            noteMax: reqSurvey.noteMax,
            typeOfVote: reqSurvey.typeOfVote,
            noteLabels: reqSurvey.noteLabels,
            delayReVote: reqSurvey.delayReVote,
            expireAt: null,
            selfDestruct: null
        });

        try {
            const savedSurvey = await survey.save();
            res.status(201).json({survey: savedSurvey});
        } catch (err) {
            next({status: 500, message: err});
        }
    },
    updateCandidate: async (req, res, next) => {
        const reqSurvey = req.body.survey;
        if (!req.params.id) {
            next({status: 400, message: "bad request"});
        } else {
            try {
                const actualSurvey = await SurveyModel.findById(req.params.id);
                if (actualSurvey) {
                    if (SURVEY.canEditSurvey(req.user, actualSurvey)) {
                        if (req.user.role === ROLE.ADMIN && !reqSurvey.admins || reqSurvey.admins.length === 0) {
                            reqSurvey.admins = [{id: req.user.id, username: req.user.username}];
                        }
                        if (!reqSurvey.members || reqSurvey.members.length === 0) {
                            reqSurvey.members = [{id: req.user.id, username: req.user.username}];
                        }
                        await SurveyModel.updateOne({_id: req.params.id}, {
                            $set: {
                                title: reqSurvey.title,
                                description: reqSurvey.description,
                                theme: reqSurvey.theme,
                                tags: reqSurvey.tags,
                                members: reqSurvey.members,
                                editors: reqSurvey.editors,
                                admins: reqSurvey.admins,
                                candidatesIds: reqSurvey.candidatesIds,
                                images: reqSurvey.images,
                                activate: reqSurvey.activate,
                                visibleBySearch: reqSurvey.visibleBySearch,
                                isPrivate: reqSurvey.isPrivate,
                                noteMax: reqSurvey.noteMax,
                                typeOfVote: reqSurvey.typeOfVote,
                                noteLabels: reqSurvey.noteLabels,
                                delayReVote: reqSurvey.delayReVote,
                                expireAt: reqSurvey.expireAt,
                                selfDestruct: reqSurvey.selfDestruct,
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
};
