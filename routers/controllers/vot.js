const votModel = require("../../db/models/vot");
const commentModel = require("../../db/models/comment");

const addVot = (req, res) => {
  const { commentId } = req.body;
  const newvot = new votModel({
    commentId: commentId,
    userId: req.token.id,
  });
  newvot.save().then((result) => {
    commentModel
      .findByIdAndUpdate(commentId, { $push: { vot: result._id } })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
const deleteVot = (req, res) => {
  const { id } = req.body;
  votModel
    .findByIdAndRemove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json("Dislike");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addVot, deleteVot };
