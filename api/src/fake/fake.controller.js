const faker = require('faker');
const log = require('../../config/log');

const UserModel = require('../user/user.model');
const SurveyModel = require('../survey/survey.model');

module.exports = {
    fakeAll: async (req, res, next) => {

        UserModel.remove({}, function(err) {
            var user = new UserModel({
                username:   "test",
                password:   "$2b$10$laG9HO2hWc/Y.omy2L.vseqQBoQ2FG3xPPJAMyAeOuCg/xUr9HffG", // "testtest1",
                first_name: "first Name",
                last_name:  "last name",
                email:      "test@yopmail.com",
            });
            user.save(function(err, user) {
                if (!err) {
                    log.info("New user " + user.username + " " + user.password);
                    next({});
                    // log.info("New user - %s:%s", user.username, user.password);
                }
                else {
                    return log.error(err);
                }
            });
        });

        // SurveyModel
        //     .remove({}, function(err) {
        // var survey = new SurveyModel({});
        //
        // survey.save(function(err, client) {
        //
        //     if (!err) {
        //     }
        //     else {
        //         return conlog.error(err);
        //     }
        //
        // });
        // });
    },
};
