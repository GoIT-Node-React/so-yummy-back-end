const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');
const { ValidationError } = require('../helpers/errors');
const { RequestFieldType } = require('../types');

const editProfileSchema = Joi.object({
  name: validationFields.name.optional(),
});

const addSubscriptionSchema = Joi.object({
  email: validationFields.email.required(),
});

function isReqDataMissing(req, _res, next) {
  if (req.file?.fieldname !== 'avatar' && !req.body?.name) {
    return next(new ValidationError('No data to update'));
  }
  next();
}

module.exports = {
  noData: isReqDataMissing,
  edit: validationRequest(editProfileSchema, RequestFieldType.body),
  subscribe: validationRequest(addSubscriptionSchema, RequestFieldType.body),
};
