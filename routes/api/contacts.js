const express = require("express");
const router = express.Router();
const { contactSchema } = require("../../validationSchemas");
const { ctrlWrapper, validation } = require("../../middlewares");
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
} = require("../../controllers/contacts");

console.log(validation);
console.log(validation(contactSchema));

router.get("/", ctrlWrapper(getAll));

router.get("/:id", ctrlWrapper(getById));

router.post("/", validation(contactSchema), ctrlWrapper(add));

router.put("/:id", ctrlWrapper(updateById));

router.delete("/:id", ctrlWrapper(removeById));

module.exports = router;
