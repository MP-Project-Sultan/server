const postModel = require("../../db/models/post");
const commentModel = require("../../db/models/comment");

const addPost = (req, res) => {
  const { description, img, title } = req.body;
  const newpost = new postModel({
    title,
    description,
    img,
    userId: req.token.id,
  });
  newpost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getPostsAdmin = (req, res) => {
  postModel
    .find()
    .populate("commentId userId like")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getPosts = (req, res) => {
  postModel
    .find({ isDel: false })
    .populate("commentId userId like")

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
const getPostById = (req, res) => {
  const { id } = req.params;
  postModel
    .find({ _id: id })
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
const deletePost = (req, res) => {
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, { $set: { isDel: true } })
    .then((result) => {
      res.status(200).json("Deleted");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const updatePost = (req, res) => {
  const { description, title } = req.body;
  const { id } = req.params;
  postModel
    .findByIdAndUpdate(id, { $set: { description: description, title: title } })
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
const getPostUser = (req, res) => {
  const { id } = req.params;

  postModel
    .find({ userId: id })

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getPostsAdmin,
  deletePost,
  addPost,
  getPostById,
  getPosts,
  updatePost,
  getPostUser,
};
