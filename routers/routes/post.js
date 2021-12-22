const express = require("express")
const {
  getPostsAdmin,
  addPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
} = require("./../controllers/post");
 const authentication = require("./../middleware/authentication")
const authorization = require("./../middleware/authorization");

const postRouter = express.Router()
postRouter.get("/getPostsAdmin", authentication, authorization, getPostsAdmin);
postRouter.post("/addPost", authentication, addPost);
postRouter.get("/getPosts", authentication, getPosts);
postRouter.delete("/deletePost", authentication,deletePost);
postRouter.get("/getPostById/:id", authentication,getPostById);
postRouter.put("/updatePost/:id",authentication, updatePost);


module.exports = postRouter