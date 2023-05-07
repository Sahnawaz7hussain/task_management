const { TaskModel } = require("../models/taskModel");

// GET TASK
const getTasks = async (req, res) => {
  const query = req.query;
  let { _page = 1, tasks } = query;
  let params = {};
  let Limit = 9;
  let Skip = Limit * (_page - 1);
  if (tasks === "all" || tasks === undefined) {
    delete params.status;
  } else {
    params.status = tasks;
  }
  try {
    let taskCount = await TaskModel.find({
      $or: [
        { userId: req.body.userId },
        { collaborators: { $all: [req.body.userId] } },
      ],
      ...params,
    }).countDocuments();
    let pendingTasks = await TaskModel.find({
      userId: req.body.userId,
      status: { $ne: "completed" },
    }).countDocuments();
    let totalPages = Math.ceil(taskCount / Limit);
    let task = await TaskModel.find({
      $or: [
        { userId: req.body.userId },
        { collaborators: { $all: [req.body.userId] } },
      ],
      ...params,
    })
      .limit(Limit)
      .skip(Skip)
      .populate("userId", "name");

    res.status(200).json({ task, totalPages, pendingTasks });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};
// GET TASK
const getDeadlineExcededTasks = async (req, res) => {
  try {
    let tasks = await TaskModel.find({
      $or: [
        { userId: req.body.userId },
        { collaborators: { $all: [req.body.userId] } },
      ],
    }).populate("userId", "name");

    const filteredTasks = deadlineExcededTasks(tasks);
    let sortedTasks = sortByDueDate(filteredTasks);
    res.status(200).json({ task: sortedTasks });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};

// GET A TASK BY ID
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

// CREATE/ADD NEW TASK
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

// UPDATE TASK
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

    res.status(200).json({ message: "Task updated", task: newTask });
  } catch (err) {
    res.status(401).json({
      message: "something went wrong pleae try again later",
      err: err.message,
    });
  }
};

// UPDATE COLLABORATOS
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
//DELETE TASK
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

function deadlineExcededTasks(tasks) {
  const today = new Date();
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate.split("-").reverse().join("-"));
    return (
      task.status !== "completed" &&
      dueDate < today &&
      !(
        dueDate.getDate() === today.getDate() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getFullYear() === today.getFullYear()
      )
    );
  });
  return overdueTasks;
}

function sortByDueDate(tasks) {
  tasks.sort((a, b) => {
    const dateA = new Date(a.dueDate.split("-").reverse().join("-"));
    const dateB = new Date(b.dueDate.split("-").reverse().join("-"));
    return dateA - dateB;
  });
  return tasks;
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateCollaborator,
  getDeadlineExcededTasks,
};
