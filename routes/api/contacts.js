const express = require("express");
const router = express.Router();
const { joiSchema, updateStatusJoiSchema } = require("../../models/contacts");
const { authCurrent, ctrlWrapper, validation } = require("../../middlewares");
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateStatus,
} = require("../../controllers/contacts");

console.log(validation);
console.log(validation(joiSchema));

router.get("/", ctrlWrapper(getAll));

router.get("/:id", ctrlWrapper(getById));

router.post("/", authCurrent, validation(joiSchema), ctrlWrapper(add));

router.put("/:id", validation(joiSchema), ctrlWrapper(updateById));

router.patch(
  "/:id/favorite",
  validation(updateStatusJoiSchema),
  ctrlWrapper(updateStatus)
);

router.delete("/:id", ctrlWrapper(removeById));

module.exports = router;
