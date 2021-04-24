const { User } = require('../models/user')
const utils = require('../utils')


module.exports = (app) => {
    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username })
            if (!username || password !== user.password) {
                res.sendStatus(401);
                return;
            }
            console.log(user);
            const token = utils.jwt.createToken({ id: user._id, username: user.username })
            res.header('Authorization', token).send(user)
            // const token = jwt.sign({ sub: username.id }, jwtSecret);
        } catch (err) {
            console.log('ERROR IN LOGIN');
            res.sendStatus(500).send(err)
        }
    });


    app.post('/register', async (req, res) => {
        
        try {
            const { username, password, email } = req.body;
            const user = await User.create({ username, password, email })
            if (!username || password !== user.password || !email) {
                res.sendStatus(401).send('error in MDB create user');
                return;
            }
            console.log('user in backend', user);
            const token = utils.jwt.createToken({ id: user._id, username: user.username })
            res.header('Authorization', token).send(user)
            // const token = jwt.sign({ sub: username.id }, jwtSecret);
        } catch (err) {
            console.log('ERROR IN LOGIN');
            res.sendStatus(500).send(err)
        }
    });

    app.post('/verify', async(req, res, next) => {
        // const token = req.cookies[config.authCookieName] || '';
        try {
            const token = req.body.token || ''
            const isVerified = await utils.jwt.verifyToken(token)
            if (isVerified) {
                const user = await User.findById(isVerified.id)
                return res.send({
                    status: true,
                    user: {_id: user._id, username: user.username, email: user.email}
                })
            }
        } catch(err) {
            console.log('Invalid token');
            return res.send({
                status: false,
                user: null
            })
        }
    })
}