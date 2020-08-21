const moment = require('moment');
let _ = require('lodash');

function isExpired(date) {
    return moment() > moment(date);
}

function waitToReVote(lastDateVote, delay) {
    return moment(lastDateVote).add(moment.duration(delay)) >= moment();
}

function isMember(userId, listOfMembers) {
    return _.some(listOfMembers, ['id', userId]);
}

module.exports = {
    PERM: function (role) {
        return (req, res, next) => {
            if (req.user.role === role) {
                next();
            } else {
                let error = new Error('Not ALLOWED')
                error.status = 405
                next(error);
            }
        }
    },
    ROLE: {
        USER: 'USER',
        ADMIN: 'ADMIN',
    },
    SURVEY: {
        canViewSurvey: function (user, survey) {
            console.log('canviewPublic', (!survey.isPrivate));
            console.log('canviewIsMem', isMember(user.id, survey.members));
            console.log('canviewRole', user.role === module.exports.ROLE.ADMIN);
            return (!survey.isPrivate ||
                isMember(user.id, survey.members) ||
                isMember(user.id, survey.editors) ||
                isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        },
        canEditSurvey: function (user, survey) {
            return (
                isMember(user.id, survey.editors) ||
                isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        },
        canDeleteSurvey: function (user, survey) {
            return (isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        }
    },
    CANDIAT: {},
    VOTE: {
        canVote: function (user, lastDateVote, survey) {
            if (survey.expiredAt && isExpired(survey.expiredAt)) {
                return {can: false, why: "expired"};
            } else if (waitToReVote(lastDateVote)) {
                return {can: false, why: "wait"};
            } else if (survey.private && !isMember) {
                return {can: false, why: "private"};
            } else {
                return {can: true, why: ""};
            }
        }
    }
};
