const express = require("express")
const {
  getPostsAdmin,
  addPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  getPostUser,
} = require("./../controllers/post");
 const authentication = require("./../middleware/authentication")
const authorization = require("./../middleware/authorization");

const postRouter = express.Router()
postRouter.get("/getPostsAdmin", authentication, authorization, getPostsAdmin);
postRouter.post("/addPost", authentication, addPost);
postRouter.get("/getPosts", getPosts);
postRouter.delete("/deletePost/:id", authentication,deletePost);
postRouter.get("/getPostById/:id", authentication,getPostById);
postRouter.put("/updatePost/:id",authentication, updatePost);
postRouter.get("/getPostsUser/:id", authentication,getPostUser);



module.exports = postRouter