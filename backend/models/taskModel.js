const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [20, "Name length should less than equal to 20 chars"],
    },
    description: { type: String, required: true },
    status: { type: String, default: "todo" },
    collaborators: { type: [String], default: [] },
    dueDate: { type: String, required: true },

    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = mongoose.model("task", taskSchema);

module.exports = { TaskModel };
