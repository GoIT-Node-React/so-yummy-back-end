const jwt = require('jsonwebtoken');
const { user: service } = require('../services');
const { UnAuthorizedError } = require('../helpers/errors');
const { convertUserData } = require('../helpers/convertUserData');

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new UnAuthorizedError('No token provided'));
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      next(new UnAuthorizedError('No token provided'));
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await service.getUserById(payload.id);

    if (!user || user.token !== token) {
      return next(new UnAuthorizedError('Invalid token'));
    }

    req.user = convertUserData(user);

    next();
  } catch (err) {
    next(new UnAuthorizedError('Invalid token'));
  }
};

module.exports = authMiddleware;
