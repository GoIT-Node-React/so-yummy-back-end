const { isValidObjectId } = require('mongoose');
const Joi = require('joi');
const { RequestFieldType } = require('../types');
const { ValidationError } = require('./errors');
const cloudinary = require('cloudinary');

const idValidation = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.error('ObjectId.invalid');
  }

  // Return the value unchanged
  return value;
};

// Validation rules
const validationFields = {
  id: Joi.string().custom(idValidation, 'Invalid id'),
  name: Joi.string().min(1).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(3).max(30),
  refreshToken: Joi.string(),
  title: Joi.string().min(3).max(30),
  category: Joi.string().min(3).max(40),
  instructions: Joi.string().min(10),
  description: Joi.string().min(8),
  time: Joi.string().min(1),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string().custom(idValidation, 'Invalid id').required(),
      measure: Joi.string().min(1).required(),
    })
  ),
  // Search, ingredients
  type: Joi.string(),
  value: Joi.string().min(1).max(30),
  //
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
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

//Request validation function after upload image middleware
const validationRequestWithImg =
  (schema, type = RequestFieldType.body) =>
  (req, _res, next) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      cloudinary.v2.uploader.destroy(req.file.filename, 'image');
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };

module.exports = {
  validationFields,
  isEmailValid,
  validationRequest,
  validationRequestWithImg,
};
