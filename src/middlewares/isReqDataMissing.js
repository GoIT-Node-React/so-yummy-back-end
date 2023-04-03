const { ValidationError } = require("../helpers/errors");

function isReqDataMissing(req, _res, next) {
    if (req.file?.fieldname !== "avatar" && !req.body?.name) {
        return next(new ValidationError("No data to update. Bad Request"));
    }
    next();
}

module.exports = isReqDataMissing;
