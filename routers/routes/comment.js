const express = require("express");
const {
  addComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsForPost,
} = require("./../controllers/comment");
const authentication = require("./../middleware/authentication");
const commentRouter = express.Router();

commentRouter.post("/addComment", authentication, addComment);
commentRouter.get('/getComments'  , getComments)
commentRouter.get("/getComments/:id", getCommentsForPost);

commentRouter.get("/getComment/:id", getCommentById);
commentRouter.put('/updateComment/:id',authentication , updateComment)
commentRouter.delete('/deleteComment/:id',authentication, deleteComment)

module.exports = commentRouter