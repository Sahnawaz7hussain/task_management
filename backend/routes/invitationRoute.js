const express = require("express");
const {
  getInvitation,
  addInvitation,
  updateInvitation,
} = require("../controllers/invitationController");

invitationRoute = express.Router();

invitationRoute.get("/get/:taskId", getInvitation);
invitationRoute.post("/add", addInvitation);
invitationRoute.put("/update/:id", updateInvitation);

module.exports = { invitationRoute };
