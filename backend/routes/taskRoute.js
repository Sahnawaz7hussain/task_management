const express = require("express");
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
  updateCollaborator,
  getDeadlineExcededTasks,
} = require("../controllers/taskController");

taskRouter = express.Router();

taskRouter.post("/create", addTask);
taskRouter.get("/get", getTasks);
taskRouter.get("/getById/:id", getTaskById);
taskRouter.get("/deadline", getDeadlineExcededTasks);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.put("/updateCollaborator/:id", updateCollaborator);

module.exports = { taskRouter };
