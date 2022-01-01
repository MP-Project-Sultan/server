const mongoose = require("mongoose");
const vot = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commentId: { type: mongoose.Schema.Types.ObjectId, re: "Comment" },
});

module.exports = mongoose.model("Vot", vot);
