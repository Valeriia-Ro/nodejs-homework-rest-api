const Joi = require('joi');

const messageValidation = { 'any.required': 'missing required name field' };

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(20).required().messages(messageValidation),
  email: Joi.string().email().min(5).required().messages(messageValidation),
  phone: Joi.string().min(7).required().messages(messageValidation),
});

module.exports = contactSchema;
