const express = require("express");
const router = express.Router();
const { ctrlWrapper, validation, authCurrent } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authCurrent, ctrlWrapper(ctrl.getCurrentUser));
router.post("/logout", authCurrent, ctrlWrapper(ctrl.logout));

module.exports = router;
