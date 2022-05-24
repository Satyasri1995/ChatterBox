const { validationResult } = require("express-validator");
const Response = require("../models/response");

exports.validator = (req, res, next) => {
  const { errors } = validationResult(req);
  const unique_errors = [...new Set(errors.map((error) => {
    console.log(error);
    return error.msg;
  }))];
  if (errors.length > 0) {
    return res.json(
      new Response(false, "error", "Validation Error", null, unique_errors)
    );
  }
  next();
};
