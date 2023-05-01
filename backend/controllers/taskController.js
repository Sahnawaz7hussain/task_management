const { TaskModel } = require("../models/taskModel");

const getTask = async (req, res) => {
  try {
    let task = await TaskModel.find({
      $or: [
        { userId: req.body.userId },
        { collaborators: { $all: [req.body.userId] } },
      ],
    });

    res.status(200).json({ task });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    let task = await TaskModel.findOne({ _id: taskId });

    res.status(200).json({ task });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
const addTask = async (req, res) => {
  try {
    let data = req.body;
    let newTask = TaskModel(data);
    await newTask.save();
    res.status(200).json({ message: "new task created", task: newTask });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
const updateTask = async (req, res) => {
  let id = req.params.id;
  try {
    let newTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "task updated", task: newTask });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
const updateCollaborator = async (req, res) => {
  let id = req.params.id;
  try {
    let newTask = await TaskModel.updateOne(
      { _id: id },
      { $push: { collaborators: req.body.userId } }
    );

    res.status(200).json({ message: "task updated", task: newTask });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
const deleteTask = async (req, res) => {
  let id = req.params.id;
  try {
    let newTask = await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "task deleted" });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};

module.exports = {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateCollaborator,
};
