const { InvitationModel } = require("../models/invitationModel");

const getInvitation = async (req, res) => {
  try {
    let invitations = await InvitationModel.find({
      invitations: req.body.userId,
    })
      .populate("userId", "name")
      .populate("task", "title description dueDate");
    res.status(200).json({ invitations });
  } catch (err) {
    res.status(401).json({
      messaage: "something went wrong please try again later.",
      err: err.message,
    });
  }
};
const addInvitation = async (req, res) => {
  let data = req.body;
  try {
    let newInvitations = await InvitationModel.create(data);
    res.status(200).json({ newInvitations });
  } catch (err) {
    res.status(401).json({
      messaage: "something went wrong please try again later.",
      err: err.message,
    });
  }
};
const updateInvitation = async (req, res) => {
  //let data = req.body;
  let id = req.params.id;
  // console.log("data: ", data, "id: : ", id);
  try {
    let newInvitations = await InvitationModel.updateOne(
      { _id: id },
      { $pull: { invitations: req.body.userId } }
    );
    res.status(200).json({ newInvitations });
  } catch (err) {
    res.status(401).json({
      messaage: "something went wrong please try again later.",
      err: err.message,
    });
  }
};

module.exports = { addInvitation, getInvitation, updateInvitation };
