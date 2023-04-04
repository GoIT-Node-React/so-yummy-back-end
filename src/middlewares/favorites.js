const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');

const favoritesSchema = Joi.object({
  recipeId: validationFields.id.required(),
});

module.exports = {
  recipeId: (type) => validationRequest(favoritesSchema, type),
};
