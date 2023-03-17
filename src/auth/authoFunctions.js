const jwt = require('jsonwebtoken');

const portToken = process.env.JWT_SECRET || 'secret';

const creatToken = (payload) => 
jwt.sign({ payload }, portToken, {
    algorithm: 'HS256',
    expiresIn: '9d',
});

const verifyToken = (token) => jwt.verify(token, portToken);

module.exports = {
    creatToken,
    verifyToken,
};