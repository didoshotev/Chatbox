const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const http = require('http')
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const dbConnection = require('./config/database');
const mongoose = require('mongoose')
require('dotenv').config()

const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');

const app = express()
app.use(cors({
    exposedHeaders: 'Authorization',
}), express.json(), expressJwt({
    credentialsRequired: false,
    secret: jwtSecret,
    algorithms: ['HS256']
}),
    express.urlencoded({
        extended: true
    }),
    cookieParser(jwtSecret)
);

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf8' });
const resolvers = require('./resolvers');


function context({ req, connection }) {
    if (req && req.user) {
        return { userId: req.user.sub };
    }
    if (connection && connection.context && connection.context.accessToken) {
        const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret)
        return { userId: decodedToken.sub }
    }
    return {};
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const user = db.users.get(name);
    if (!(user && user.password === password)) {
        res.sendStatus(401);
        return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
});

// app.listen(port, () => console.log(`Server started on port ${port}`));
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

