const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const compress = require("compression");
const helmet = require("helmet");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const apiRoute = require("./api/apiRoute");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN + ":" + process.env.CLIENT_PORT,
    credentials: true,
  })
);

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(compress());
app.use(helmet());

app.use("/ChatterBox", apiRoute);

app.use("*", (req, res, next) => {
  res.status(404);
  res.json({ message: "Page Not Found" });
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    if (result) {
      const server = http.createServer(app);
      const io = require("./api/socket").init(server, {
        path: "/socket.io",
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false,
        cors: {
          origin: process.env.CLIENT_DOMAIN + ":" + process.env.CLIENT_PORT,
        },
      });
      server.listen(process.env.PORT || 3000);
      console.log("Connected to Database !...");
      io.on("connection", onConnectionHandler);
    } else {
      console.log("Connection to Database Failed !...");
    }
  })
  .catch((error) => {
    console.log(error);
  });
