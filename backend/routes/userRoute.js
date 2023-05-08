const express = require("express");
const {
  signup,
  login,
  getAllUser,
  verifyEmail,
} = require("../controllers/userController");
const { Authentication } = require("../middlware/authentications");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/verifyemail", verifyEmail);
userRouter.get("/getall", Authentication, getAllUser);

module.exports = { userRouter };
