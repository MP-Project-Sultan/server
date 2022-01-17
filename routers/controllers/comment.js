const commentModel = require("./../../db/models/comment");
const postModel = require("./../../db/models/post");

const addComment = (req, res) => {
  const { description, postId } = req.body;
  const newcomment = new commentModel({
    description,
    postId: postId,
    userId: req.token.id,
  });
  newcomment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(postId, { $push: { commentId: result._id } })
        .then((result) => {
          res.status(201).json(result);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getComments = (req, res) => {
  commentModel
    .find({})
    .populate("userId")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getCommentById = (req, res) => {
  const { id } = req.params;
  commentModel
    .find({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const getCommentsForPost = (req, res) => {
  const { id } = req.params;
  commentModel
    .find({ postId: id, isDel: false })
    .populate("userId postId vot")
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const deleteComment = (req, res) => {
  const { id } = req.params;
  commentModel
    .findByIdAndRemove({ _id:id }, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateComment = (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  commentModel
    .findOneAndUpdate(id, { $set: { description: description } })
    .then((result) => {
      if (result) {
        res.status(200).json("Updated");
      } else {
        res.status(400).json("you don't have permission");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
module.exports = {
  addComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsForPost,
};
