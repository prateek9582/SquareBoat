const express = require("express");
const {SignUp , login} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/signup").post(SignUp);
userRouter.route("/login").post(login);
module.exports = userRouter;