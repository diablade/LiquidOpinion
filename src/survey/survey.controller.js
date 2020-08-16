const SurveyModel = require('./survey.model');
const {SURVEY} = require('../tools/permission');

module.exports = {
    createSurvey: async (req, res, next) => {
        //TODO validate data
        const reqSurvey = req.body.survey;
        const survey = new SurveyModel({
            title: reqSurvey.title,
            creator: reqSurvey.creator,
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
            selfDestruct: null,
            modified: Date.now,
            created: Date.now,
        });

        try {
            const savedSurvey = await survey.save();
            res.status(200).json({survey: savedSurvey});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    updateSurvey: async (req, res, next) => {
        const reqSurvey = req.body.survey;
        try {
            const actualSurvey = await SurveyModel.findById(req.params.id);
            if (!SURVEY.canEditSurvey(req.user, actualSurvey)) res.status(405).send({message: "not allowed"});
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
        try {
            const updatedSurvey = await SurveyModel.updateOne({_id: req.params.id}, {
                $set: {
                    title: reqSurvey.title,
                    creator: reqSurvey.creator,
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
                    modified: Date.now,
                }
            });
            console.log(updatedSurvey);
            res.status(200).json({message: "ok"});
        } catch (err) {
            console.log(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                res.status(500).send(err);
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
                    res.status(401).send('Not allowed');
                }
            } else {
                res.status(404).send('Not found');
            }
        } catch (err) {
            console.log('user error', err);
            res.status(500).send("not found");
        }
    },
    getSurveys: (req, res, next) => {

    },
};
