const mongoose = require('mongoose');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const USERNAME_REGEX // TODO !!!

//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    role: {
        type: String,
        default: 'USER'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email is required',
        validate: {
            validator: function(v) {
                return EMAIL_REGEX.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        min:2,
        max:35
        // validate: {
        //     validator: function(v) {
        //         return USERNAME_REGEX.test(v);
        //     },
        //     message: "username invalid, must length 6 - 20 "
        // },
    },
    first_name: String,
    last_name: String,
    description: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    photo: String,
    modified: { type: Date,default: Date.now},
    created: {type: Date,default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
