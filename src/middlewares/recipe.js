const Joi = require('joi');

const { RequestFieldType } = require('../types');
const { validationFields, validationRequest, validationRequestWithImg } = require('../helpers/validation');

const recipeSchema = Joi.object({
  title: validationFields.title.required(),
  category: validationFields.category.required(),
  instructions: validationFields.instructions.required(),
  description: validationFields.description.required(),
  time: validationFields.time.required(),
  ingredients: validationFields.ingredients.required(),
});

const recipeIdSchema = Joi.object({
  recipeId: validationFields.id.required(),
});

const recipeCategoryNameSchema = Joi.object({
  categoryName: validationFields.category.required(),
});

module.exports = {
  recipe: validationRequestWithImg(recipeSchema, RequestFieldType.body),
  recipeId: validationRequest(recipeIdSchema, RequestFieldType.params),
  recipeCategoryName: validationRequest(recipeCategoryNameSchema, RequestFieldType.params),
};
