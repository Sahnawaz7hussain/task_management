const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    task: { type: mongoose.Types.ObjectId, required: true, ref: "task" },
    invitations: { type: [String], default: [] },
  },
  { versionKey: false }
);

const InvitationModel = mongoose.model("invitation", invitationSchema);

module.exports = { InvitationModel };
