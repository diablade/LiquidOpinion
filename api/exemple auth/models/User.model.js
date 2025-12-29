import UserModel from '../schemas/user.schema.js';

/* Create */
UserModel.createNew = async (userObject) => {
    const newUser = new UserModel({
        firstName: userObject.firstName || 'Unnamed',
        lastName:  userObject.lastName || 'Unnamed',
        email:     userObject.email || 'Unnamed',
        password:  userObject.password,
        roles:     userObject.roles || [],
        username:  userObject.username || '',
        company:   userObject.company || '',
        function:  userObject.function || '',
    });
    return await newUser.save();
};

/* Retrieve */
UserModel.getById = async (id) => {
    return await UserModel.findById(id).exec();
};

UserModel.getByUsername = async (username) => {
    return await UserModel.findOne({username}).exec();
};

UserModel.getAll = async () => {
    return await UserModel.find({}).exec();
};

/* Update */
UserModel.updateProperties = async (id, updates) => {
    return await UserModel.updateOne({_id: id}, {$set: updates}).exec();
};

/* Remove */
UserModel.remove = async (id) => {
    return await UserModel.findByIdAndDelete(id).exec();
};

export default UserModel;
