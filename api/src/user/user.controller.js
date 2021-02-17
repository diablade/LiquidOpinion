const bcrypt = require('bcrypt');
const auth = require('../tools/auth');
const UserModel = require('./user.model');
const asyncLib = require('async');

// const PASSWORD_REGEX = /^(?=.*[0-9])(?=.{8,})$/;
const PASSWORD_REGEX = /^(?=.*\d).{6,20}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function checkEmail(req, done) {
    const email = req.body.email;
    if (email == null) {
        done({status: 400, message: 'email is not given'});
    } else if (!EMAIL_REGEX.test(email)) {
        done({status: 400, message: 'email is not valid'});
    } else {
        done(null, req);
    }
}

function checkPassword(req, done) {
    const password = req.body.password;
    if (password == null) {
        done({status: 400, message: 'password is not given'});
    } else if (!PASSWORD_REGEX.test(password)) {
        done({status: 400, message: 'password invalid (must length 6 - 20 and include 1 number at least)'});
    } else {
        done(null, req);
    }
}

function checkDuplicateEmailOrUsername(req, done) {
    UserModel.findOne({$or: [{email: req.body.email}, {username: req.body.username}]})
        .then(result => {
            if (result) {
                done({status: 403, message: "email or username already exist"});
            } else {
                done(null, req);
            }
        })
        .catch(err => {
            done({status: 500, message: err});
        });
}

function hashPassword(req, done) {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SECURITY_SALT_ROUND));
        const hash = bcrypt.hashSync(req.body.password, salt)
        done(null, req, hash);
    } catch (err) {
        console.log(err);
        done({status: 500, message: 'hash error'});
    }
}

function createUser(req, hashPass, done) {
    const user = new UserModel({
        email: req.body.email,
        password: hashPass,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
    });
    done(null, user);
}

function saveUser(user, done) {
    user.save()
        .then(savedUser => {
            done(null, savedUser);
        })
        .catch(err => {
            console.log(err);
            done({status: 500, message: 'save error'});
        });
}

function generateToken(user, done) {
    try {
        const token = auth.generateToken(user.id);
        done(null, user, token);
    } catch (err) {
        done({status: 500, message: err});
    }
}

module.exports = {
    register: async (req, res, next) => {
        asyncLib.waterfall([
                asyncLib.apply(checkEmail, req),
                checkPassword,
                checkDuplicateEmailOrUsername,
                hashPassword,
                createUser,
                saveUser,
                generateToken,
            ],
            function (err, user, token) {
                if (err) {
                    let error = new Error(err.message);
                    error.status = err.status;
                    next(error);
                } else if (user && token) {
                    user.password = null; //hide before send
                    res.setHeader('liquid-token', token)
                    res.status(200).json({user});
                }
            });
    },
    login: async (req, res, next) => {
        if (!EMAIL_REGEX.test(req.body.email)) return res.status(400).json({'error': 'email not valid'});

        //check email existing account
        const user = await UserModel.findOne({email: req.body.email});
        if (user == null) return res.status(403).json({status: "error", message: "Invalid credential"});

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = await auth.generateToken(user.id);
            const masterToken = await auth.generateMasterToken(user.id);
            user.password = null; //hide before send
            res.setHeader('liquid-token', token);
            // res.setHeader('liquid-master-token', masterToken);
            res.status(200).json(user);
        } else {
            res.status(400).json({status: "error", message: "Invalid credential", data: null});
        }

    },
    update: async (req, res, next) => {
        const userModified = req.body.user;
        try {
            const updatedUser = await UserModel.updateOne({_id: userModified.id}, {
                $set: {
                    //email: userModified.email,
                    username: userModified.username,
                    first_name: userModified.first_name,
                    last_name: userModified.last_name,
                    description: userModified.description,
                    photo: userModified.photo,
                    modified: Date.now(),
                }
            });
            updatedUser.password = null; //hide before send
            res.status(200).json({message: "updated", user: updatedUser});
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                console.log(err);
                res.status(500).send(err);
            }
        }
    },
    updateEmail: async (req, res, next) => {
        const email = req.body.email;
        try {
            const updatedUser = await UserModel.updateOne({_id: req.user.id}, {
                $set: {
                    email: email,
                    modified: Date.now(),
                }
            });
            updatedUser.password = null; //hide before send
            res.status(200).json({message: "updated", user: updatedUser});
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                next(new Error('There was a duplicate key error'));
            } else {
                console.log(err);
                res.status(500).send(err);
            }
        }
    },
    updatePassword: (req, res, next) => {
        //TODO update password

        // checkPassword(req, next);
        // checkPassword(req, next);
        //
        // UserModel.findById(req.userId).then(user => {
        // })
        //     .catch(err)
        // {
        //
        // }
        // if (err) return res.status(500).send(err);
        // if (user.email !== email) return res.status(500).send(err);
        //
        // // Mise à jour des données
        // user.password = password ? bcrypt.hashSync(password, process.env.SECURITY_SALT) : user.password;
        // user.save(function (err, data) {
        //     if (err) return res.status(500).send(err);
        //     res.status(200).json({message: "password Changed !", data: "ok"});
        // });
        //
    },
    getMe: async (req, res, next) => {
        try {
            const user = req.user;
            user.password = null; //hide before send
            res.status(200).json(user);
        } catch (err) {
            console.log('user error', err);
            next(new Error("error me user"));
        }
    },
    getAll: async (req, res, next) => {
        // TODO
        // try {
        //     const user = await UserModel.all();
        //     user.password = null;
        //     res.status(200).json(user);
        // } catch (err) {
        //     console.log('user error', err);
        //     res.status(500).send("error me user");
        // }
    },
    getUsersSummary: async (req, res, next) => {
        // try { //TODO get many users summary
        //     const ids = req.params.ids;
        //     const users = await UserModel.findById(...);
        //     map ... etc...
        //     foreach(user in users){
        //         var ...
        //     }
        //     var userSummury;
        //     userSummury.username = user.username;
        //     userSummury.photoId = user.photoId;
        //     res.status(200).json(user);
        // } catch (err) {
        //     console.log('user error', err);
        //     res.status(404).send("not found");
        // }
    },
    getUser: async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.params.id);
            user.password = null; //hide before send
            res.status(200).json(user);
        } catch (err) {
            console.log('user error', err);
            next(new Error("not found", 404));
        }
    },
    deleteUser: (req, res, next) => {
        //TODO delete user myself or ADMIN
    },
    lostPassword: (req, res, next) => {
        //TODO lost password myself or ADMIN
    }
};
