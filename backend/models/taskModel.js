const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "todo" },
    collaborators: { type: [String], default: [] },
    dueDate: { type: String, required: true },

    userId: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };
