const { ValidationError } = require("../helpers/errors");

function isUploadAvatarError(error, req, _res, next) {
    if (error?.message?.includes("Unexpected field")) {
        return next(
            new ValidationError(
                "Wrong field name for image uploading. Bad request"
            )
        );
    }
    next();
}

module.exports = isUploadAvatarError;
