const dotenv = require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        dbURL: 'mongodb+srv://test123:test123123@cluster0.a7hhx.mongodb.net/Chatbox?retryWrites=true&w=majority',
        authCookieName: 'x-auth-token',
        host: process.env.DB_HOST
    },
    production: {}
};

module.exports = config[env]