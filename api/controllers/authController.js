const mongoose = require("mongoose");
const UserSchemaModel = require("./../schemas/userSchema");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Login = require("../models/login");
const Response = require("../models/response");
const crypto = require("crypto");
const SignUp = require("../models/signup");

exports.login = async (req, res, next) => {
  const cred = new Login(req.body);
  const user = await UserSchemaModel.findOne().where("mail").equals(cred.mail);
  const token = await crypto.randomBytes(64).toString("hex");
  const response = { user: {}, isLoggedIn: false, token: "" };
  if (user) {
    const valid = bcrypt.compareSync(cred.password, user.password);
    if (valid) {
      req.session.user = user;
      const muser = new User(user);
      response.user = muser;
      response.isLoggedIn = true;
      response.token = token;
      return res.json(new Response(true, "success", null, null, response));
    } else {
      response.user = {};
      response.isLoggedIn = false;
      response.token = "";
      return res.json(
        new Response(
          false,
          "error",
          "Authentication Failed",
          "Invalid password",
          response
        )
      );
    }
  } else {
    response.user = {};
    response.isLoggedIn = false;
    response.token = "";
    return res.json(
      new Response(
        false,
        "error",
        "Authentication Failed",
        "Please enter a valid mail",
        response
      )
    );
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json(
        new Response(false, "error", "Error", "Failed to logout", null)
      );
    } else {
      return res.json(
        new Response(true, "success", "Success", "User logout successful", null)
      );
    }
  });
};

exports.signup = async (req, res, next) => {
  const cred = new SignUp(req.body);
  let user = await UserSchemaModel.findOne().where("mail").equals(cred.mail);
  if (user) {
    throw new Error("Mail already in use");
  }
  user = new UserSchemaModel();
  user.mail = cred.mail;
  const hashPassword = bcrypt.hashSync(cred.password, 10);
  user.password = hashPassword;
  const newUser = await user.save();
  const muser = new User(newUser);
  if (newUser) {
    return res.json(
      new Response(true, "success", "Success", "Registration Successful", muser)
    );
  } else {
    throw new Error("User Registration failed");
  }
};
