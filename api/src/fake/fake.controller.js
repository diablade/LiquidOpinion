var faker = require('faker/locale/fr');
var moment = require('moment');
var _ = require('lodash');
const log = require('../../config/log');

const UserModel = require('../user/user.model');
const SurveyModel = require('../survey/survey.model');
const CandidateModel = require('../candidate/candidate.model');

function fakeCurrentVotes(nbVotants, opinions) {
    var votes = [];
    for (let i = 0; i < nbVotants; i++) {
        votes.push({
            idOfOpinion: opinions[faker.random.number(opinions.length() - 1)].id,
            hashUserId:  faker.random.uuid,
            last:        moment().subtract(faker.random.number(10) + 1, 'days'),
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
                result:      faker.random.number(10000)
            });
        }
        notes.push({
            date:    moment().subtract(i + 1, 'days'),
            results: results
        });
    }
    return notes;
}

function fakeImages() {
    return [
        {
            format: "small",
            url:    faker.image.image
        }, {
            format: "card",
            url:    faker.image.image
        }, {
            format: "big",
            url:    faker.image.image
        }, {
            format: "banner",
            url:    "http://placeimg.com/800/200/any"
        }
    ];
}

function fakeCandidate(surveyId, multiplier) {
    var candidates = [];
    for (let i = 0; i < multiplier; i++) {
        candidates.push(new CandidateModel({
            title:           faker.lorem.sentence,
            surveyId:        surveyId,
            description:     faker.lorem.paragraphs(3),
            longDescription: faker.lorem.paragraphs(10),
            currentVotes:    fakeCurrentVotes(),
            archiveNotes:    fakeArchiveNotes(),
            noteMax:         5,
            opinions:        [
                {
                    label: 'rejeter',
                    id:    'rejected',
                    color: '#e8554e'
                }, {
                    label: 'mauvais',
                    id:    'bad',
                    color: '#f19c65'
                }, {
                    label: 'neutre',
                    id:    'neutral',
                    color: '#ffd265'
                }, {
                    label: 'bien',
                    id:    'good',
                    color: '#2aa876'
                }, {
                    label: 'excellent',
                    id:    'excellent',
                    color: '#0a7b83'
                },
            ],
            images:          fakeImages(),
            modified:        Date.now,
            created:         Date.now,
        }));
    }
    return candidates;
}

function fakeSurvey(numberCandidats, creator, admins, editors, members) {
    return new SurveyModel({
        id:              id,
        title:           faker.lorem.sentence(),
        slug:            faker.lorem.slug(),
        creator:         creator,
        slogan:          faker.lorem.sentences(),
        description:     faker.lorem.paragraph(),
        themes:          [faker.lorem.word()],
        tags:            [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        admins:          admins,
        editors:         editors,
        members:         members,
        candidatesIds:   fakeCandidate(id),
        images:          fakeImages(),
        activate:        true,
        visibleBySearch: true,
        isPrivate:       false,
        typeOfVote:      'label',
        reVoteDelay:     '1D',
        expireAt:        new Date(),
        selfDestruct:    new Date(),
        modified:        new Date(),
        created:         new Date(),
    });
}

module.exports = {
    removeAll: async (req, res, next) => {
        UserModel.removeAllItem();
        SurveyModel.removeAllItem();
        CandidateModel.removeAllItem();
    },
    fakeAll:   async (req, res, next) => {
        var user = new UserModel({
            username:   "test",
            password:   "$2b$10$laG9HO2hWc/Y.omy2L.vseqQBoQ2FG3xPPJAMyAeOuCg/xUr9HffG", // "testtest1",
            first_name: "first Name",
            last_name:  "last name",
            email:      "test@yopmail.com",
        });
        await user.save(function(err, user) {
            if (!err) {
                log.info("New user " + user.username + " " + user.password);
                next({});
            }
            else {
                return log.error(err);
            }
        });

        var surveyId;
        var survey = await fakeSurvey();
        await survey.save(function(err, survey) {
            if (!err) {
                surveyId = survey.id;
            }
            else {
                return log.error(err);
            }
        });

        var candidates = await fakeCandidate(surveyId, faker.random.number(25));
        for (let candidate of candidates) {
            candidate.save(function(err, candi) {
                if (!err) {

                }
                else {
                    return log.error(err);
                }
            })
        }

        survey.candidatesIds = _.map(candidates, 'id');
    },
};
