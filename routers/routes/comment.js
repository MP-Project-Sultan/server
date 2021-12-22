const express = require("express");
const {
  addComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("./../controllers/comment");
const authentication = require("./../middleware/authentication");
const commentRouter = express.Router();

commentRouter.post("/addComment", authentication, addComment);
commentRouter.get('/getComments' , authentication , getComments)
commentRouter.get("/getComment/:id", authentication, getCommentById);
commentRouter.put('/updateComment/:id',authentication , updateComment)
commentRouter.delete('/deleteComment/:id',authentication, deleteComment)

module.exports = commentRouter