const express = require("express");
require("dotenv").config();
const cors = require("cors");
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
