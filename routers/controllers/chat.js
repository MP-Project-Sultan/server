const chatModel = require("./../../db/models/chat");
const userHistory = require("./../../db/models/userHistory");
const getChat = (req, res) => {
  chatModel
    .find({ $or: [{ from: req.token.id }, { to: req.token.id }] })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).json("no message");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getHistory = (req, res) => {
  userHistory
    .find({ user: req.token.id })
    .populate("userHistory")
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).json("no message");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const addMessage = (from, to, message, username) => {
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  chatModel
    .findOneAndUpdate(
      { from: from, to: to, username: username },
      { $push: { content: message } },
      options
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
const updateHistory = (req, res) => {
  const { newUser } = req.body;
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  userHistory
    .findOneAndUpdate(
      { user: req.token.id },
      { $addToSet: { userHistory: newUser } },
      options
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addMessage, getChat, getHistory, updateHistory };
