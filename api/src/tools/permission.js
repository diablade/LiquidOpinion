const moment = require('moment');
let _ = require('lodash');

function isExpired(date) {
    return moment() > moment(date);
}

function waitToReVote(lastDateVote, delay) {
    return moment(lastDateVote).add(moment.duration(delay)) >= moment();
}

function getLastVote(userHashId, votes) {
    const userVotes = _.find(votes, function (v) {
        return v.encryptedUserId === userHashId
    });
    if (userVotes) {
        return _.orderBy(userVotes, [date], ['desc'])[0];
    }
    return null;
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
    CANDIDATE: {
        canViewCandidate: function (user, survey) {
            return (!survey.isPrivate ||
                isMember(user.id, survey.members) ||
                isMember(user.id, survey.editors) ||
                isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        },
        canEditCandidate: function (user, survey) {
            return (
                isMember(user.id, survey.editors) ||
                isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        },
        canDeleteCandidate: function (user, survey) {
            return (isMember(user.id, survey.admins) ||
                user.role === module.exports.ROLE.ADMIN);
        }
    },
    VOTE: {
        canAccessVotation: function (user, survey) {
            if (!survey.activate) {
                return {can: false, why: "deactivate"};
            } else if (survey.expiredAt && isExpired(survey.expiredAt)) {
                return {can: false, why: "expired"};
            } else if (survey.isPrivate && !isMember(user.id, survey.members)) {
                return {can: false, why: "private"};
            } else {
                return {can: true, why: ""};
            }
        },
        allowDelayVote: function (userHashId, candidate, delay) {
            const lastDateVote = getLastVote(userHashId, candidate.votes);
            if (lastDateVote && waitToReVote(lastDateVote, delay)) {
                return {can: false, why: "wait"};
            } else {
                return {can: true, why: ""};
            }
        }
    }
};
