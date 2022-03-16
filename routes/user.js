const express = require("express");

const router = express.Router();
const userController = require("./../controllers/user");
const authController = require("./../controllers/auth");

router.get("/profile", authController.protect, userController.getMe);
router.patch(
  "/update-profile",
  authController.protect,
  userController.updateMe
);

module.exports = router;
