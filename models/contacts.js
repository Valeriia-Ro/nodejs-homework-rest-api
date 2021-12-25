const { Schema, model } = require("mongoose");
const Joi = require("joi");

const messageValidationFavorite = {
  "any.required": "missing field favorite",
};

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(1).max(20).required(),
  email: Joi.string().email().min(5).required(),
  phone: Joi.string().min(7).required(),
  favorite: Joi.bool(),
});

const updateStatusJoiSchema = Joi.object({
  favorite: Joi.boolean().required().messages(messageValidationFavorite),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  updateStatusJoiSchema,
};
