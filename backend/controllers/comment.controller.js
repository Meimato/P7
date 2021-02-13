const db = require("../models");
const Comment = db.comment;

exports.writeComment = (req, res) => {
  const myArticleId = req.body.article;
  const myComment = req.body.text;
  const myAuthor = req.body.username;

  const comment = {
    author: myAuthor,
    text: myComment,
    ArticleId: myArticleId,
  };

  Comment.create(comment)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) =>
      res.status(500).send({ message: err })
    );
};

exports.readComments = (req, res) => {
  Comment.findAll({
    where: {
      ArticleId: req.params.id
    }
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
};

exports.trashComment = (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(res.status(200).send({ message: "Article delete!" }))
  .catch((err) => res.status(500).send({ message: "Database Error: Cannot delete comment."}));

};