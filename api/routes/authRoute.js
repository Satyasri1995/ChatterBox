const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const validationController = require("../controllers/validationController");
const { catchError } = require("../controllers/errorController");

router.post(
  "/login",
  check("mail")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please Enter a valid E-Mail"),
  validationController.validator,
  catchError(authController.login)
);

router.post(
  "/signup",
  check("mail")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please Enter a valid E-Mail"),
  check("confirmPassword").custom(async (confirmPassword, { req }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error("Password confirmation is incorrect");
    }
  }),
  validationController.validator,
  catchError(authController.signup)
);

router.post(
  "/forgotpassword",
  check("mail")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please Enter a valid E-Mail"),
  validationController.validator,
  catchError(authController.forgotPassword)
);



router.get("/logout", authController.logout);

module.exports = router;
