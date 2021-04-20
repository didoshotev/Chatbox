const mongoose = require('mongoose')
const { Schema } = mongoose

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

const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}