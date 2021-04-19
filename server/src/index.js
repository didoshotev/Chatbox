import dotenv from 'dotenv';
import express from 'express';
const models = require('./models/user')
import mongoose from 'mongoose';
import db from './utils/db';
const http = require('http')
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');

import './utils/db';
import schema from './schema';

function context({ req, connection }) {
    console.log('REQ IN APOLLO CONTEXT:', req.user);
    // console.log('CONNECTION IN APOLLO CONTEXT:', connection);
}

dotenv.config();

const app = express();
app.use(cors({
    exposedHeaders: 'Authorization',
}),
express.json(),
expressJwt({
    credentialsRequired: false,
    secret: jwtSecret,
    algorithms: ['HS256']
  })
)

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
    context
});

server.applyMiddleware({
    app,
    path: '/graphql',
    cors: true,
});

app.post('/login', async(req, res) => {
    const { username, password } = req.body
    const user = await models.User.findOne({username})
    
    if (!user || user.password !== password) {
      res.sendStatus(401)
      return
    }
    const token = jwt.sign({sub: user._id}, jwtSecret)
    res.header('Authorization', token).send(user);
});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer)
httpServer.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));

// app.listen({ port: process.env.PORT }, () => {
//     console.log(`🚀 Server listening on port ${process.env.PORT}`);
// });