require("dotenv").config();
const nodemailer = require("nodemailer");

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
  console.log("invitation Data: ", data);
  try {
    let newInvitations = await InvitationModel.create({
      task: data.task,
      userId: data.userId,
      invitations: data.invitations,
    });
    let user = [
      "zahid852hussain@gmail.com",
      "sahnawazhussain852@gmail.com",
      "secretsultimate@gmail.com",
    ];
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: `"${data.name}" <${data.email}>`, // sender address
      to: user, // list of receivers
      subject: "To Collaborate to a task", // Subject line
      text: "My portfolio", // plain text body
      html: `
        <p><strong>${data.name}</strong>has invited you collaborate to <strong>${data.title}</strong>. </p>
        <br>
        <p>Click the below link to accept or reject invitation.</p>
        <a href=${process.env.FRONTEND_LINK}/#/invitation/${data.task} target="_blank" >Click Here</a>
        `, // html body
    });

    //console.log("info: ", info);
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
