const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const authRoute = require("./routes/authRoute");

append.use("/auth",authRoute);

module.exports = router;
