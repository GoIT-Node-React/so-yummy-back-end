const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');

const RequestFieldType = require('../types/requestFieldType');

const querySchema = Joi.object({
  type: validationFields.type.required(),
  value: validationFields.value.required(),
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

module.exports = {
  searchRecipe: validationRequest(querySchema, RequestFieldType.query),
};
