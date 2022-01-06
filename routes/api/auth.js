const express = require("express");
const router = express.Router();
const {
  ctrlWrapper,
  validation,
  authCurrent,
  upload,
} = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiSchema } = require("../../models/user");
router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", authCurrent, ctrlWrapper(ctrl.getCurrentUser));
router.post("/logout", authCurrent, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  authCurrent,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get(
  "/verify:verificationToken",

  ctrlWrapper(ctrl.verifyEmail)
);

module.exports = router;
