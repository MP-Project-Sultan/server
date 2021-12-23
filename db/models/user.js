const mongoose = require("mongoose")
const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  img: { type: String },
  isdel: { type: Boolean },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "61c0858605291c57ea3039df",
  },
  isActive: { type: Boolean, default: false },
  activeCode: { type: String },
  passwordCode: { type: String },
  isDel:{type: Boolean, default: false}
});
module.exports = mongoose.model("User" , user)