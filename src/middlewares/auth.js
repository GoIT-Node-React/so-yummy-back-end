const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { user: service } = require("../services");
const { UnAuthorizedError } = require("../helpers/errors");
const { convertUserData } = require("../helpers/convertUserData");
const {
  validationFields,
  validationRequest,
} = require("../helpers/validation");
const { RequestFieldType } = require("../types");

const { JWT_ACCESS_SECRET } = process.env;

const loginSchema = Joi.object({
  email: validationFields.email.required(),
  password: Joi.string().min(1).required(),
});

const registerSchema = Joi.object({
  name: validationFields.name.required(),
  email: validationFields.email.required(),
  password: validationFields.password.required(),
});

const refreshSchema = Joi.object({
  refreshToken: validationFields.refreshToken.required(),
});

const auth = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new UnAuthorizedError("No token provided"));
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      return next(new UnAuthorizedError("No token provided"));
    }
    const payload = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await service.getUserById(payload.id);

    if (!user || user.accessToken !== token) {
      return next(new UnAuthorizedError("Invalid token"));
    }

    req.user = convertUserData(user);

    next();
  } catch (err) {
    next(new UnAuthorizedError("Invalid token"));
  }
};

module.exports = {
  register: validationRequest(registerSchema, RequestFieldType.body),
  login: validationRequest(loginSchema, RequestFieldType.body),
  refresh: validationRequest(refreshSchema, RequestFieldType.body),
  auth,
};
