const Joi = require("joi");
const { validationRequest } = require("../helpers/validation");
const { CATEGORIES } = require("../helpers/variables");
const { RequestFieldType } = require("../types");

const newestSchema = Joi.object({
  categories: Joi.string()
    .regex(
      new RegExp(`^(${CATEGORIES.join("|")})(,(${CATEGORIES.join("|")}))*$`)
    )
    .message("Invalid type of category"),
});

module.exports = {
  newest: validationRequest(newestSchema, RequestFieldType.query),
};
