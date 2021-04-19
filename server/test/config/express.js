const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64')

module.exports = (app) => {
    app.use(cors({
        exposedHeaders: 'Authorization',
    }),
    expressJwt({
        credentialsRequired: false,
        secret: jwtSecret,
        algorithms: ['HS256']
    })
    );
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser(secret));
};