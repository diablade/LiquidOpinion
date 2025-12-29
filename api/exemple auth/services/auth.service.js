import jwt from 'jsonwebtoken';
import env from './../../config/env.js'

const ACCESS_TOKEN_SECRET = env.access_token_secret;
const REFRESH_TOKEN_SECRET = env.refresh_token_secret;

const ACCESS_TOKEN_EXPIRES = env.access_token_expires;
const REFRESH_TOKEN_EXPIRES = env.refresh_token_expires;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRES || !REFRESH_TOKEN_EXPIRES) {
    throw new Error('AccessTokenSecret and RefreshTokenSecret are required');
}

export const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES
    });
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES
    });
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access login required'});
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({message: 'Token expired'});
            }
            return res.status(403).json({message: 'Invalid token'});
        }
        req.user = decoded;
        next();
    });
}
