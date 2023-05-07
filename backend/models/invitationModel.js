const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    invitations: { type: [String], default: [] },
    task: { type: mongoose.Types.ObjectId, required: true, ref: "task" },
  },
  { versionKey: false }
);

const InvitationModel = mongoose.model("invitation", invitationSchema);

module.exports = { InvitationModel };
