const Joi = require('joi');
const {
  validationRequest,
  idValidation,
} = require("../helpers/validation");

const ShoppingListSchema = Joi.object({
  value: Joi.string().min(1).required(),
  ingredient: Joi.string().custom(idValidation, "Invalid id"),
});

module.exports = {
  addShoppingListItem: validationRequest(ShoppingListSchema, "body"),  
};