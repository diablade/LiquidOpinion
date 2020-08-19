const SurveyModel = require('./survey.model');
const {SURVEY} = require('../tools/permission');

module.exports = {
    createSurvey: async (req, res, next) => {
        //TODO validate data
        const reqSurvey = req.body.survey;
        if (!reqSurvey.admins || reqSurvey.admins.length === 0) {
            reqSurvey.admins = [{id: req.user.id, username: req.user.username}];
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
    updateSurvey: async (req, res, next) => {
        const reqSurvey = req.body.survey;
        if (!reqSurvey.admins || reqSurvey.admins.length === 0) {
            reqSurvey.admins = [{id: req.user.id, username: req.user.username}];
        }
        try {
            const actualSurvey = await SurveyModel.findById(req.params.id);
            if (!SURVEY.canEditSurvey(req.user, actualSurvey)) {
                next({status: 405, message: "not allowed"});
            } else {
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
                next();
            }
        } catch (err) {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                next({status: 500, message: err});
            }
        }
    },
    getSurvey: (req, res, next) => {
        try {
            const survey = SurveyModel.findById(req.params.id);
            if (survey) {
                if (SURVEY.canViewSurvey(req.userId, survey)) {
                    res.status(200).json(survey);
                    next();
                } else {
                    next({status: 401, message: "Not allowed"});
                }
            } else {
                next({status: 404, message: "Not found"});
            }
        } catch (err) {
            console.log('user error', err);
            next({status: 404, message: "not found"});
        }
    },
    getSurveys: (req, res, next) => {

    },
    deleteSurvey: (req, res, next) => {

    },
};
