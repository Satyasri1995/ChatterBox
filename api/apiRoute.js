const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const authRoute = require("./routes/authRoute");
const chatRoute = require("./routes/chatRoute");

router.use("/auth",authRoute);
router.use("/contact",chatRoute);

module.exports = router;
