const jwt = require('jsonwebtoken');

const portToken = process.env.JWT_SECRET || 'secret';

const creatToken = (payload) => 
jwt.sign({ payload }, portToken, {
    algorithm: 'HS256',
    expiresIn: '9d',
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    try {
      if (!token) {
          return res.status(401).json({ message: 'Token not found' });
      }
      const payload = jwt.verify(token, portToken);

      req.user = payload.payload;
      console.log(req.user);
      return next();
    } catch (err) {
      err.statusCode = 401;
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  };

module.exports = {
    creatToken,
    verifyToken,
};