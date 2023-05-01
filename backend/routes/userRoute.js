const express = require("express");
const { signup, login, getAllUser } = require("../controllers/userController");
const { Authentication } = require("../middlware/authentications");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/getall", Authentication, getAllUser);

module.exports = { userRouter };
