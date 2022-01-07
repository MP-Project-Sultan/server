const nodemailer = require("nodemailer");
const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
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
  newUser
    .save()
    .then((result) => {
      transport.sendMail({
        from: "mg7l@hotmail.com",
        to: nemail,
        subject: "kindly confirm your account",
        html: `<h1>Email confirmation</h1> 
            <h2> Hi ${nemail}</h2> 
            <h4> Code: ${activeCode}</h4> 
            <p> Thank you for registeration , kindly confirm your email by insert code on following link</p>
            <a href="https://quirky-dubinsky-3af6fa.netlify.app/active/${result._id}" click here</a>`,
      });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const verifyAccount = async (req, res) => {
  const { id, code } = req.body;
  console.log(code);
  const user = await userModel.findOne({ _id: id });
  console.log(user);
  if (user.activeCode == code) {
    userModel
      .findByIdAndUpdate(id, { isActive: true, activeCode: "" }, { new: true })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("Wrong Code");
  }
};
const login = (req, res) => {
  const { email, password, username } = req.body;
  userModel
    .findOne({ $or: [{ email }, { username }] })
    .then(async (result) => {
      if (result) {
        if (result.isDel == false) {
          if (email == result.email || username == result.username) {
            const payload = {
              role: result.role,
              id: result._id,
              isDel: result.isDel,
            };
            console.log(result);

            const crackedpwd = await bcrypt.compare(password, result.password);
            if (crackedpwd) {
              if (result.isActive == true) {
                const options = {
                  expiresIn: 600 * 600,
                };
                const token = jwt.sign(payload, SECKEY, options);
                res.status(200).json({ result, token });
              } else {
                res.status(400).json("please Active your Account");
              }
            } else {
              res.status(400).json("worng email || password");
            }
          } else {
            res.ststus(400).json("worng email || password");
          }
        } else {
          res.status(400).json("email dosn't match our records");
        }
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { isDel: true } })
    .exec()
    .then((result) => {
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const updateUser = async (req, res) => {

  const { email, password, username, img } = req.body;
  const { id } = req.params;

  userModel
    .findByIdAndUpdate(id, {
      $set: { email, password, username, img },
    })
    .then((result) => {
      if (result) {
        res.status(200).json("updated");
      } else {
        res.status(400).json(err);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const checkEmail = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    let passwordCode = "";
    const characters = "0123456789";
    for (let i = 0; i < 4; i++) {
      passwordCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    userModel
      .findByIdAndUpdate(user._id, { passwordCode }, { new: true })
      .then((result) => {
        transport
          .sendMail({
            from: process.env.EMAIL,
            to: result.email,
            subject: "Reset your Password",
            html: `<h1>Reset your Password</h1>
        <h2> Hello ${result.username}</h2>
        <h4>Code:${passwordCode}</h4>
        <a href=https://quirky-dubinsky-3af6fa.netlify.app/reset2/${result._id}> Click here</a>`,
          })
          .catch((err) => console.log(err));
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("No user with this email");
  }
};
const resetPassword = async (req, res) => {
  const { id, code, password } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (user.passwordCode == code) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword, passwordCode: "" },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(400).json("worng Code...");
  }
};
const getUserById = (req, res) => {
  const { id } = req.params;
  userModel
    .find({ _id: id }, { password: 0, passwordCode: 0, isDel:0 })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  register,
  verifyAccount,
  login,
  deleteUser,
  updateUser,
  checkEmail,
  resetPassword,
  getUserById,
  getUsers,
};
