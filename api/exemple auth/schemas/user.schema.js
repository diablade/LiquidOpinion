import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    roles: {
        type: [String],
        required: true,
        enum: ['admin', 'user'],
        default: []
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    function: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
