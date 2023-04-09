const Joi = require('joi');
const { validationRequest, validationFields } = require('../helpers/validation');
const { RequestFieldType } = require('../types');

const ShoppingListSchema = Joi.object({
  value: validationFields.value.required(),
  ingredientId: validationFields.id.required(),
  recipeId: validationFields.id.required(),
});

const deleteSchema = Joi.object({
  id: validationFields.id.required(),
});

module.exports = {
  add: validationRequest(ShoppingListSchema, RequestFieldType.body),
  delete: validationRequest(deleteSchema, RequestFieldType.params),
};
