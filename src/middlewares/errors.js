const { responseError } = require("../helpers/apiHelpers");
const { BaseError, ServerError } = require("../helpers/errors");

const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof BaseError) {
        return res.status(error.code).json(responseError(error));
    }

    return res.status(500).json(responseError(new ServerError(error.message)));
};

module.exports = errorMiddleware;
