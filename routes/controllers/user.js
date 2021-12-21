const nodemailer = require("nodemailer");
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
require("dotenv").config();
const SALT = Number(process.env.SALT);
const SECKEY = process.env.SECKEY;
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
const register = async (req, res) => {
  const { email, username, password, role, img } = req.body;
  const nemail = email.toLowerCase();
  const hashpwd = await bcrypt.hash(password, SALT);
  const characters = "0123456789";
  let activeCode = "";
  for (let i = 0; i < 4; i++) {
    activeCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const newUser = new userModel({
    email: nemail,
    password: hashpwd,
    username,
    img,
    role,
    activeCode,
  });
  newUser;
  newUser
    .save()
    .then((result) => {
      transport
        .sendMail({
          from: "mg7l@hotmail.com",
          to: nemail,
          subject: "kindly confirm your account",
          html: `<h1>Email confirmation</h1> 
            <h2> Hi ${nemail}</h2> 
            <h4> Code: ${activeCode}</h4> 
            <p> Thank you for registeration , kindly confirm your email by insert code on following link</p>
            <a href="https://sultan.com/verify_account/${result._id}> click here</a>`,
        })
        .catch((err) => console.log(err));
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.activeCode == code) {
    userModel;
    findByIdAndUpdate(id, { isActive: true, activeCode: "" })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
      res.status(400).json("Wrong Code")
  }
};

module.exports = { register, verifyAccount };
