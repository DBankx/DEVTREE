require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // request the token from the header of the api call
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Token needed for authorization' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'invalid token' });
  }
};
