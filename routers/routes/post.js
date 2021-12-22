const express = require("express")
const {
  addPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require("./../controllers/post");
 const authentication = require("./../middleware/authentication")

const postRouter = express.Router()
postRouter.post("/addPost", authentication, addPost);
postRouter.get("/getPosts", authentication, getPosts);
postRouter.delete('/deletePost',deletePost)
postRouter.get('/getPostById/:id',getPostById)
postRouter.put("/updatePost/:id", updatePost);


module.exports = postRouter