import {createAccessToken, createRefreshToken, verifyRefreshToken} from '../services/auth.service.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const AuthController = {};

AuthController.login = async (req, res, next) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await UserModel.getByUsername(username);
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = createAccessToken({
                id:    user._id,
                roles: user.roles
            });
            const refreshToken = createRefreshToken({
                id:    user._id,
                roles: user.roles
            });

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure:   false,
                sameSite: 'lax',
                path:     '/api/auth/refresh',
                maxAge:   1000 * 60 * 60 * 24 * 7
            });

            res.json({
                accessToken,
                roles: user.roles
            });
        }
        else {
            return res.status(401).json({
                message: "password or username incorrect"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "internal server error" + error
        });
    }
};
AuthController.refresh = (req, res, next) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.sendStatus(403);
        }
        const payload = verifyRefreshToken(token);
        const newToken = createAccessToken({
            id:    payload.id,
            roles: payload.roles
        });
        res.json({
            accessToken: newToken,
            roles:       payload.roles
        });
    }
    catch {
        return res.status(403).json({
            message: "forbidden"
        });
    }
};
AuthController.logout = (req, res) => {
    res.clearCookie('refresh_token', {path: '/api/auth/refresh'});
    res.sendStatus(204);
};

export default AuthController;
