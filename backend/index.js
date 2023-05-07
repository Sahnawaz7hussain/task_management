const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { connection } = require("./config/db");
const { taskRouter } = require("./routes/taskRoute");
const { userRouter } = require("./routes/userRoute");
const { Authentication } = require("./middlware/authentications");
const { invitationRoute } = require("./routes/invitationRoute");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("welcome to homepage");
});
app.get("/sendmail", async (req, res) => {
  try {
    let user = [
      "zahid852hussain@gmail.com",
      "sahnawazhussain852@gmail.com",
      "secretsultimate@gmail.com",
    ];
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: '"Sahnawaz Hussain" <sahnawaz852@gmail.com>', // sender address
      to: user, // list of receivers
      subject: "This is Sahnawaz Hussain testing mail", // Subject line
      text: "My portfolio", // plain text body
      html: `
      <h1>This email for testing<strong> purpose for multi user</strong> </h1>
      <a href="https://sahnawaz7hussain.github.io/" target="_blank" >My portfolio</a>
      `, // html body
    });
    res.json(info);
  } catch (err) {
    console.log("err: ", err);
  }
});

app.use("/user", userRouter);
app.use("/task", Authentication, taskRouter);
app.use("/invite", Authentication, invitationRoute);

app.listen(PORT, async () => {
  try {
    console.log("connecting with db");
    await connection;
    console.log("connected with db");
    console.log(`server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log({ message: "Unable to connect with db", err: err.message });
  }
});
