const jwt = require('jsonwebtoken');
const UserModel = require('../user/user.model');


function signToken(userId) {
    return jwt.sign({
            userId: userId
        },
        process.env.SECURITY_JWT_SIGN,
        {
            expiresIn: '1h'
        })
}

async function signMasterToken(userId) {
    return jwt.sign({
            userId: userId
        },
        process.env.SECURITY_JWT_MASTER_SIGN,
        {
            expiresIn: '7d'
        })
}

//exported function
module.exports = {
    generateToken: function (userId) {
        return signToken(userId);
    },
    generateMasterToken: function (userId) {
        return signMasterToken(userId);
    },
    refreshToken: async function (req, res, next) {
        try {
            const token = await module.exports.generateToken(req.userId);
            res.setHeader('liquid-token', token);
            res.status(200).send("ok");
        } catch (err) {
            console.log('token error', err);
            res.status(500).send("error token");
        }
    },
    authUser: async function (req, res, next) {
        const token = req.header('liquid-token');
        if (!token) return next({status: 401, message: "user not found"});
        try {
            const verifiedToken = jwt.verify(token, process.env.SECURITY_JWT_SIGN);
            UserModel.findById(verifiedToken.userId)
                .then(user => {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        next({status: 401, message: "access denied"});
                    }
                })
                .catch(err => {
                    next({status: 500, message: err});
                });
        } catch (err) {
            console.log('token error', err);
            res.status(400).send('invalid token');
        }
    },
    authMasterUser: function (req, res, next) {
        const masterToken = req.header('liquid-master-token');
        if (!masterToken) return res.status(401).send("access denied");
        try {
            const verifiedToken = jwt.verify(masterToken, process.env.SECURITY_JWT_MASTER_SIGN);
            req.userId = verifiedToken.userId;
            next();
        } catch (err) {
            console.log('token error', err);
            res.status(400).send('invalid token');
        }
    },
    authRole: function (role) {
        return async (req, res, next) => {
            try {
                //get user account
                const user = await UserModel.findById(req.userId);
                if (user == null) return res.status(404).json({status: "error", message: "user doesn't exist"});

                if (user.role === role) {
                    req.user = user;
                    next();
                } else {
                    let error = new Error('Not ALLOWED')
                    error.status = 405
                    next(error);
                }
            } catch (err) {
                console.log(err);
                next(new Error('error system'));
            }

        }
    }
};
