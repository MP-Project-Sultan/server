const express = require('express');
const {
  register,
  verifyAccount,
  login,
  deleteUser,
  updateUser,
  checkEmail,
  resetPassword,
} = require("./../controllers/user");
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/active',verifyAccount)
userRouter.post('/login' , login)
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.put("/updateUser/:id", updateUser);
userRouter.post("/check/", checkEmail);
userRouter.post("/reset/", resetPassword);





module.exports = userRouter;