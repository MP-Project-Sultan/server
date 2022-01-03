const express = require("express");
const {
  addMessage,
  getChat,
  updateHistory,
  createRoom,
  getRoomMessages,
} = require("./../controllers/chat");
const chatRouter = express.Router();

const authentication = require("./../middleware/authentication");

chatRouter.post("/getChat/:id", authentication, getChat);
chatRouter.post("/addMessage", authentication, addMessage);
chatRouter.post("/createRoom", authentication, createRoom);
chatRouter.get("/roomChat/:to", authentication, getRoomMessages);

module.exports = chatRouter;
