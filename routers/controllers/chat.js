const chatModel = require("./../../db/models/chat");
const messageModel = require("./../../db/models/message");

const getChat = async (req, res) => {
  const id = req.params.id;

  const result1 = await chatModel.find({ from: req.token.id, to: id });
  const result2 = await chatModel.find({ from: id, to: req.token.id });
  console.log(result1, result2, "here");
  if (result1.length !== 0) {
    res.status(200).json(result1);
  }
  if (result2.length !== 0) {
    res.status(200).json(result2);
  }

  if (result1.length === 0 && result2.length === 0) {
    const newChat = new chatModel({
      from: req.token.id,
      to: id,
    });

    newChat
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
};

const createRoom = (req, res) => {
  const { from, to } = req.body;
  const newChat = new chatModel({
    from,
    to,
  });

  newChat
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

const getRoomMessages = async (req, res) => {
  try {
    const {  to } = req.params;
     const  from  = req.token.id;

    const result1 = await chatModel.findOne({ from, to }).populate("message");
    res.status(200).json(result1);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const addMessage = (req, res) => {
  const { content, room, to } = req.body;
  const from = req.token.id
  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };
  const newMessage = new messageModel({
    from,
    to,
    content,
    room,
  });

  newMessage
    .save()
    .then((result) => {
      chatModel
        .findOneAndUpdate(
          { from: from, to: to },
          { $push: { message: result._id } },
          options
        )
        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log("err", err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
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

module.exports = {
  addMessage,
  getChat,
  updateHistory,
  createRoom,
  getRoomMessages,
};
