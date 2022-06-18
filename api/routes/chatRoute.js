const express = require("express");
const router = express.Router();
const chatController = require("../controllers/contactController");
const { check } = require("express-validator");
const validationController = require("../controllers/validationController");
const { catchError } = require("../controllers/errorController");

router.post(
  "/search",
  check("query").isString().withMessage("Query Invalid"),
  validationController.validator,
  catchError(chatController.userSearch)
);

router.post(
  "/addContact",
  check("userId").isMongoId().withMessage("Invalid user id"),
  check("name").isString().withMessage("Invalid Username"),
  validationController.validator,
  catchError(chatController.addContact)
);

router.post(
  "/userDetails",
  check("userId").isMongoId().withMessage("Invalid user id"),
  validationController.validator,
  catchError(chatController.getUser)
)

router.post(
  "/messages",
  check("conversationId").isMongoId().withMessage("Invalid conversation id"),
  validationController.validator,
  catchError(chatController.getConversation)
)

module.exports = router;
