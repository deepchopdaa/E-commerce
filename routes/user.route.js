const express = require("express");
const Router = express.Router();
const { RegisterUser, LoginUser } = require("../controller/User.controller.js")

Router.post("/register", RegisterUser);
Router.post("/login", LoginUser);
module.exports = Router