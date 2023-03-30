const Joi = require("Joi");
const {
  validationSearchQuery,
  validationRequest,
} = require("../helpers/validation");

const querySchema = Joi.object({
  type: validationSearchQuery.type.required(),
  value: validationSearchQuery.value.required(),
});

module.exports = {
  getRecipe: validationRequest(querySchema, "query"),
};
