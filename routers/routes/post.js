const express = require("express")
const {
  addPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require("./../controllers/post");
const postRouter = express.Router()
postRouter.post('/addPost' ,addPost)
postRouter.get('/getPosts',getPosts)
postRouter.delete('/deletePost/:id',deletePost)
postRouter.get('/getPostById/:id',getPostById)
postRouter.put("/updatePost/:id", updatePost);


module.exports = postRouter