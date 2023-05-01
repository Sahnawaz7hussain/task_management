const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const Authentication = async (req, res, next) => {
  try {
    let tokenPresent = req.headers.authorization || null;
    if (tokenPresent) {
      let token = tokenPresent.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.json("Ivalid token");
        req.body.userId = decoded.userId;
        next();
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ message: "invalid request Please login again." });
  }
};

module.exports = { Authentication };
