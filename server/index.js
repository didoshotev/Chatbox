const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const http = require('http')
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/user')
const { jwt } = require('./utils')

const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');

const app = express()
app.use(cors({
    exposedHeaders: 'Authorization',
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}), express.json(), expressJwt({
    credentialsRequired: false,
    secret: jwtSecret,
    algorithms: ['HS256']
}),
    express.urlencoded({
        extended: true
    }),
    cookieParser(jwtSecret),
);

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf8' });
const resolvers = require('./resolvers');


async function context(data) {
    if (data.req && data.req.user) {
        return { userId: data.req.user.id, username: data.req.user.username };
    }
    if (data.connection && data.connection.context && data.connection.context.accessToken) {
        const decodedToken = await jwt.verifyToken(data.connection.context.accessToken)
        return { userId: decodedToken.id, username: decodedToken.username }
    }
    return {}
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: '/graphql', cors: false, credentials: true, exposedHeaders: 'Authorization',});

userRoutes(app)

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer)

mongoose
    .connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        httpServer.listen(config.port, () => console.log(`Server started on port ${config.port}`));
    })
    .catch((err) => {
        console.log('Error while connecting to MongoDB', err);
    })