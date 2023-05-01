const { UserModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;

const signup = async (req, res) => {
  try {
    let { email, name, password } = req.body;
    let isUserPresent = (await UserModel.findOne({ email })) || null;
    if (isUserPresent) {
      return res.status(409).json({ message: "User exist please login" });
    }
    const hash = bcrypt.hashSync(password, salt);
    // console.log("hash: ", hash);
    let newUser = UserModel({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ message: "signup succesfull", user: req.body });
  } catch (err) {
    res
      .status(401)
      .json({ message: "something went wrong!", err: err.message });
  }
  // res.send("signup");
};
// LOGIN

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = (await UserModel.findOne({ email })) || null;
    if (!userFound) return res.status(404).json({ message: "User not found!" });

    let isCorrectPassword = bcrypt.compareSync(password, userFound.password);
    if (isCorrectPassword) {
      // generate token

      const token = jwt.sign({ userId: userFound._id }, secret);
      res.status(200).send({ message: "Login Success", token: token });
    } else {
      return res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    res.status(401).json({
      message: "something went wrong please try again later",
      err: err.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    let allUser = await UserModel.find({
      _id: { $ne: req.body.userId },
    }).select("name _id");
    res.status(200).json({ users: allUser });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong please try again later",
      err: err.message,
    });
  }
};

module.exports = { signup, login, getAllUser };
