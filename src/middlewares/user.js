const Joi = require("joi");
const {
    validationFields,
    validationRequest,
} = require("../helpers/validation");

const loginSchema = Joi.object({
    email: validationFields.email.required(),
    password: validationFields.password.required(),
});

const registerSchema = Joi.object({
    name: validationFields.name.required(),
    email: validationFields.email.required(),
    password: validationFields.password.required(),
});

const editProfileSchema = Joi.object({
    name: validationFields.name,
});

const addSubscriptionSchema = Joi.object({
    email: validationFields.email.required(),
});

/* const emailSchema = joi.object({
  email: validationFields.email.required(),
});*/

module.exports = {
    register: validationRequest(registerSchema, "body"),
    login: validationRequest(loginSchema, "body"),
    edit: validationRequest(editProfileSchema, "body"),
    subscribe: validationRequest(addSubscriptionSchema, "body"),
    //email: validationRequest(emailSchema, 'body'),
};
