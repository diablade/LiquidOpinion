var _ = require('lodash');
const log = require('../../config/log');

const UserModel = require('../user/user.model');
const SurveyModel = require('../survey/survey.model');
const CandidateModel = require('../candidate/candidate.model');
const {isAdmin} = require("../tools/permission");

module.exports = {
    removeAll: async (req, res, next) => {
        if(!isAdmin(req.user.role)) next();
        log.info('reset');
        UserModel.remove();
        SurveyModel.remove();
        CandidateModel.remove();
        log.info('end');
        next({status: 200, ok: 'ok'});
    },
};
