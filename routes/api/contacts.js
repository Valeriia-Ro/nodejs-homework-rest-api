const express = require("express");
const router = express.Router();
const { contactSchema } = require("../../schema/contactSchema");
const getAll = require("../../controllers/contacts/getAll");
const getById = require("../../controllers/contacts/getById");
const add = require("../../controllers/contacts/add");
const updateById = require("../../controllers/contacts/updateById");
const removeById = require("../../controllers/contacts/removeById");

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
const validateMiddleware = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

router.get("/", ctrlWrapper(getAll));

router.get("/:id", ctrlWrapper(getById));

router.post("/", validateMiddleware, ctrlWrapper(add));

router.put("/:id", validateMiddleware, ctrlWrapper(updateById));

router.delete("/:id", ctrlWrapper(removeById));

module.exports = router;
