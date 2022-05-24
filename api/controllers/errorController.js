const Response = require("../models/response");

exports.errorControl = (error, req, res, next) => {
  console.log(error);
  return res.json(new Response(false, "error", "Error", error.message, null));
};

exports.catchError = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
