const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().min(5).required(),
  phone: Joi.string().min(10).required(),
}).required();

module.exports = contactSchema;
