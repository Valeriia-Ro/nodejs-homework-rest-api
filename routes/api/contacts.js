const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../middlewares/ctrlWrapper");
const { validation } = require("../../middlewares/validation");
const { contactSchema } = require("../../schema/contactSchema");
const { ctrl } = require("../../controllers/contacts/index");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
