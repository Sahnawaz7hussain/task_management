const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { connection } = require("./config/db");
const { taskRouter } = require("./routes/taskRoute");
const { userRouter } = require("./routes/userRoute");
const { Authentication } = require("./middlware/authentications");
const { invitationRoute } = require("./routes/invitationRoute");
const { TaskModel } = require("./models/taskModel");

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

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("update-status", async (data) => {
    // console.log("data: ", data);
    let taskId = data.taskId;
    //let userId = data.userId;
    try {
      let newTask = await TaskModel.findByIdAndUpdate(
        taskId,
        {
          $set: { status: data.status },
        },
        {
          new: true,
        }
      );
      socket.emit("status-updated", { status: true });
    } catch (err) {
      console.log("err: ", err);
      socket.emit({ status: false });
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(PORT, async () => {
  try {
    console.log("connecting with db");
    await connection;
    console.log("connected with db");
    console.log(`server running at http://localhost:${PORT}`);
  } catch (err) {
    console.log({ message: "Unable to connect with db", err: err.message });
  }
});
