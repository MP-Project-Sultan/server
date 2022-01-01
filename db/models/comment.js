const mongoose = require("mongoose");
const comment = new mongoose.Schema({
  description: { type: String, required: true },
  time: { type: Date, default: new Date() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  isDel: { type: String, default: false },
  vot: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vot" }],
});
module.exports = mongoose.model("Comment",comment)