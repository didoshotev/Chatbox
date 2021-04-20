const env = process.env.NODE_ENV || 'development';
require('dotenv').config()


const config = {
    development: {
        port: process.env.PORT || 9000,
        dbURL: `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.a7hhx.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`,
        authCookieName: 'x-auth-token',
        host: process.env.DB_HOST
    },
    production: {}
};
module.exports = config[env]