const Joi = require("Joi");
const {
  validationIngredientsSearchQuery,
  validationRequest,
} = require("../helpers/validation");

const querySchema = Joi.object({
  value: validationIngredientsSearchQuery.value.optional(),
});

module.exports = {
  getIngredients: validationRequest(querySchema, "query"),
};
