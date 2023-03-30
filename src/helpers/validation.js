import { isValidObjectId } from 'mongoose';
import joi from 'joi';

const idValidation = (value, helpers) => {
  // Use error to return an existing error code
  if (!isValidObjectId(value)) {
    return helpers.error('ObjectId.invalid');
  }

  // Return the value unchanged
  return value;
};

export const validationFields = {
  id: joi.string().custom(idValidation, 'Invalid id'),
  email: joi.string().email(),
};

export const isEmailValid = (email) => !validationFields.email.validate(email).error;
