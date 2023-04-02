const Joi = require("Joi");
const {
  validationFields,
  validationRequest,
} = require("../helpers/validation");

const RequestFieldType = require("../types/requestFieldType");

const querySchema = Joi.object({
  value: validationFields.value.optional(),
});

module.exports = {
  getRecipeByIngredient: validationRequest(querySchema, RequestFieldType.query),
};
