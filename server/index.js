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
// import { graphqlExpress } from 'apollo-server-express'
const userRoutes = require('./routes/user')

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


function context(data) { //{ req, connection, res }
    return data.res
    // if(req.body.operationName === 'addUser') {
    //      console.log(req.body.variables);
    //     const token = utils.jwt.createToken({ id: user._id })
    //     res.header('Authorization', token)
    //     console.log(res.header);
    //     return token
    // }
    
    // if (req && req.user) {
    //     return { userId: req.user.id };
    // }
    // if (connection && connection.context && connection.context.accessToken) {
    //     const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret)
    //     return { userId: decodedToken.id }
    // }
    // return {};
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