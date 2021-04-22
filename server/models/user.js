const mongoose = require('mongoose')
const { Schema } = mongoose
const Model = mongoose.model

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: 'users',
    }
);

const User = new Model('User', UserSchema)

module.exports = {
    User
}