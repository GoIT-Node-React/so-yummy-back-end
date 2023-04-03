const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');

const RequestFieldType = require('../types/requestFieldType');

const querySchema = Joi.object({
  value: validationFields.value.optional(),
});

module.exports = {
  getIngredients: validationRequest(querySchema, RequestFieldType.query),
};
