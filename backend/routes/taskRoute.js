const express = require("express");
const {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateCollaborator,
} = require("../controllers/taskController");

taskRouter = express.Router();

taskRouter.post("/create", addTask);
taskRouter.get("/get", getTask);
taskRouter.get("/getById/:id", getTaskById);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);
taskRouter.put("/updateCollaborator/:id", updateCollaborator);

module.exports = { taskRouter };
