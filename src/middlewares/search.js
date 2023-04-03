const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');

const RequestFieldType = require('../types/requestFieldType');

const querySchema = Joi.object({
  type: validationFields.type.required(),
  value: validationFields.value.required(),
  page: validationFields.type.optional(),
  limit: validationFields.value.optional(),
});

module.exports = {
  searchRecipe: validationRequest(querySchema, RequestFieldType.query),
};
