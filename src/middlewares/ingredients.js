const Joi = require("Joi");
const {
  validationSearchQuery,
  validationRequest,
} = require("../helpers/validation");

const querySchema = Joi.object({
  value: validationSearchQuery.value.required(),
});

module.exports = {
  getIngredients: validationRequest(querySchema, "query"),
};
