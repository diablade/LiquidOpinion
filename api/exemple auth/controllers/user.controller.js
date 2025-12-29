import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import log from '../../config/log.js';

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);   // do 'password + pepper' ?
}

const UserController = {};
UserController.getLoggedUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await UserModel.getById(id);
        if (user) {
            return res.json(user);
        }
        else {
            res.status(404).json({
                message: "not found"
            });
        }
    }
    catch (error) {
        res.status(404).json({
            message: "internal server error" + error
        });
    }
};
UserController.create = async (req, res, next) => {
    try {
        let userFound = await UserModel.getByUsername(req.body.username);
        if (!userFound) {
            req.body.password = hashPassword(req.body.password);
            let newUser = await UserModel.createNew(req.body);
            if (newUser && newUser._id) {
                return res.status(200).json(newUser);
            }
            else {
                res.status(500).json({
                    message: "internal server error"
                });
            }
        }
        else {
            res.status(404).json({
                message: "Username already exists"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error" + error
        });
    }
};
UserController.update = async (req, res, next) => {
    try {
        const id = req.body.id;
        const updates = req.body.updates;
        if (updates.password) {
            updates.password = hashPassword(updates.password);
        }
        const result = await UserModel.updateProperties(id, updates)
        return res.json(result);
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error" + error
        });
    }
};
UserController.getAll = async (req, res, next) => {
    try {
        const result = await UserModel.getAll();
        return res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error" + error
        });
    }
};
UserController.getById = async (req, res, next) => {
    try {
        const id = req.query.id;
        const result = await UserModel.getById(id);
        if (result && result._id) {
            return res.json(result);
        }
        else {
            res.status(404).json({
                message: "not found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error" + error
        });
    }
};
UserController.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await UserModel.remove(id);
        if (result && result.id === id) {
            return res.json(result);
        }
        else {
            res.status(404).json({
                message: "not found"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "internal server error" + error
        });
    }
};

export default UserController;
