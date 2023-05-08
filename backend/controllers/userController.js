const { UserModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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

    // SENDING VERIFICATION EMAIL;
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const hashedEmail = hashEmail(email);
    let info = await transporter.sendMail({
      from: `"Task Manager app" <taskmanager@gmail.com>`, // sender address
      to: email, // list of receivers
      subject: "Verify Your Task Manager Account", // Subject line
      html: `
        
        <p>Click the below link to verify you email</p>
        <a href=${process.env.FRONTEND_LINK}/#/verify/${hashedEmail}/${email} target="_blank" >Click Here</a>
        `, // html body
    });

    res
      .status(200)
      .json({ message: "signup succesfull", user: req.body, info });
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
    const userFound =
      (await UserModel.findOne({ email, verified: true })) || null;
    if (!userFound) return res.status(404).json({ message: "User not found!" });

    let isCorrectPassword = bcrypt.compareSync(password, userFound.password);
    if (isCorrectPassword) {
      // generate token

      const token = jwt.sign({ userId: userFound._id }, secret);
      res.status(200).send({
        message: "Login Success",
        token: token,
        name: userFound.name,
        id: userFound._id,
        email: userFound.email,
      });
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
      verified: true,
    }).select("name _id email");
    res.status(200).json({ users: allUser });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong please try again later",
      err: err.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  let { email, hash } = req.body;
  try {
    let userFound = await UserModel.findOne({ email });
    let comparedResult = compareHashEmail(email, hash);
    if (comparedResult.success) {
      let updatedUser = await UserModel.findByIdAndUpdate(userFound._id, {
        verified: true,
      });
      res.status(200).json({ verification: true });
    } else {
      res.status(401).json({ verification: false });
    }
  } catch (err) {
    res.status(401).json({ message: "verification failed" });
  }
};

module.exports = { signup, login, getAllUser, verifyEmail };

// hash email
function hashEmail(email) {
  return crypto.createHash("sha256").update(email).digest("hex");
}

// compare hashed email;
const compareHashEmail = (email, hashedEmail) => {
  if (hashEmail(email) === hashedEmail) {
    return { success: true, message: "matched" };
  }
  return { success: false, message: "not matched" };
};
