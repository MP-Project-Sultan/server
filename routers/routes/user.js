const express = require('express');
const {
  register,
  verifyAccount,
  login,
  deleteUser,
  updateUser,
  checkEmail,
  resetPassword,
  getUserById,
  getUsers,
} = require("./../controllers/user");
const authentication = require('./../middleware/authentication')
const authorization = require('./../middleware/authorization')
const userRouter = express.Router()
userRouter.get('/getUsers', authentication,authorization,getUsers)
userRouter.post('/register', register)
userRouter.post('/active',verifyAccount)
userRouter.post('/login' , login)
userRouter.delete("/deleteUser/:id", authentication, authorization, deleteUser);
userRouter.put("/updateUser/:id",authentication, updateUser);
userRouter.post("/check/", checkEmail);
userRouter.get("/getUserById/:id", authentication, getUserById);

;
userRouter.post("/reset/", resetPassword);





module.exports = userRouter;