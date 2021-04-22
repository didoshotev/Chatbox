const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');

function createToken(data) {
    return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) { reject(err); return; }
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken,
}