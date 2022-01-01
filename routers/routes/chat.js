const express = require("express");
const {
  addMessage,
  getChat,
  getHistory,
  updateHistory,
} = require("./../controllers/chat");
const chatRouter = express.Router();

const authentication = require("./../middleware/authentication");


chatRouter.get('/getChat',authentication,getChat)
chatRouter.get('/getHistory', authentication, getHistory);
chatRouter.post('/addMessage', authentication,addMessage)
chatRouter.post("/updateHistory", authentication, updateHistory);

module.exports = chatRouter;