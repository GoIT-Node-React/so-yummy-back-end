const Joi = require("Joi");
const {
  validationFields,
  validationRequest,
} = require("../helpers/validation");

const recipeSchema = Joi.object({
  title: validationFields.title.required(),
  category: validationFields.category.required(),
  instructions: validationFields.category.required(),
  description: validationFields.description.required(),
  time: validationFields.description.required(),
  ingredients: validationFields.description.required(),
});

module.exports = {
  recipe: validationRequest(recipeSchema, "body"),
};
