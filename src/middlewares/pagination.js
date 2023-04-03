const Joi = require('joi');
const { validationFields, validationRequest } = require('../helpers/validation');
const { RequestFieldType } = require('../types');

const paginationSchema = Joi.object({
  page: validationFields.page.optional(),
  limit: validationFields.limit.optional(),
});

module.exports = {
  pagination: validationRequest(paginationSchema, RequestFieldType.query),
};
