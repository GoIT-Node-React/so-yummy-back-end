const { isValidObjectId } = require("mongoose");
const Joi = require("joi");
const { RequestFieldType } = require("../types");
const { ValidationError } = require("./errors");

const idValidation = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.error("ObjectId.invalid");
  }

  // Return the value unchanged
  return value;
};

// Validation rules
const validationFields = {
  id: Joi.string().custom(idValidation, "Invalid id"),
  name: Joi.string().min(1).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(3).max(30),
};

// Validation search query
const validationSearchQuery = {
  type: Joi.string().required(),
  value: Joi.string().min(1).max(30).required(),
};

// Email validation for mongoose schema
const isEmailValid = (email) => !validationFields.email.validate(email).error;

// Request validation function
const validationRequest =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

module.exports = {
  validationFields,
  validationSearchQuery,
  isEmailValid,
  validationRequest,
};
