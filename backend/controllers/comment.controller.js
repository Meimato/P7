const db = require("../models");
const Comment = db.comment;
const User = db.user;

/**
 * Creates a comment for this article
 *
 * @param {Object} req - The HTTP request to create a comment
 * @param {string} req.body.article - The article ID
 * @param {string} req.body.text - The article description
 * @param {string} req.body.username - The author of the comment
 * @param {Object} res - The HTTP response containing the comment
 */

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
    .catch((err) => res.status(500).send({ message: err }));
};

/**
 * Shows all comments for a given article
 *
 * @param {Object} req - The HTTP request
 * @param {string} req.params.id - The article ID
 * @param {Object} res - The HTTP response containing the comments
 */

exports.readComments = (req, res) => {
  Comment.findAll({
    where: {
      ArticleId: req.params.id,
    },
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

/**
 * Deletes a comment with the provided ID
 *
 * @param {Object} req - The HTTP request
 * @param {string} req.params.id - The comment ID
 * @param {Object} res - The HTTP response
 */

exports.trashComment = (req, res) => {
  const myId = req.params.id;
  const myUserId = JSON.parse(req.headers.authorization);
  let myUsername = "";
  let myUserRole = "";

  User.findByPk(myUserId.userId)
    .then((user) => {
      myUsername = user.username;
      user.getRoles().then((roles) => {
        myUserRole = roles[0].name;
      });

      Comment.findByPk(myId)
        .then((data) => {
          if (data.author == myUsername || myUserRole == "moderator") {
            Comment.destroy({
              where: {
                id: myId,
              },
            })
              .then(res.status(200).send({ message: "Comment deleted!" }))
              .catch(() =>
                res
                  .status(500)
                  .send({ message: "Database Error: Cannot delete comment." })
              );
          } else {
            return res.status(401).json({ error: "Unauthorized client" });
          }
        })
        .catch(() => res.status(404).send({ error: "Comment not found!" }));
    })
    .catch(() => res.status(404).send({ error: "User not found!" }));
};
