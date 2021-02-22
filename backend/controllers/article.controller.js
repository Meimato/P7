const db = require("../models");
const Article = db.article;
const User = db.user;

const Op = db.Sequelize.Op;
const fs = require("fs");

/**
 * Creates an article containing the title, description and an image (optional).
 *
 * @param {Object} req - The HTTP request to create the article
 * @param {string} req.body.title - The title of the article
 * @param {string} req.body.description - The article description
 * @param {string} req.file - The image to upload
 * @param {Object} res - The HTTP response containing the article in JSON format
 *
 */

exports.create = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  if (title == "" || description == "") {
    return res.status(400).send({
      message: "Please provide title and description",
    });
  }

  User.findByPk(req.body.userId)
    .then((item) => {
      const article = {
        title: title,
        description: description,
        author: item.username,
        image: image,
      };

      Article.create(article)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch(() =>
          res.status(500).send({ message: "Error during article creation" })
        );
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Username",
      });
    });
};

/**
 * Shows all articles or a selection of articles
 *
 * @param {Object} req - The HTTP request to show a selection of articles
 * @param {string} req.query.title - The title used as a search filter
 * @param {Object} res - The HTTP response containing the articles
 */

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Article.findAll({ where: condition })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch(() =>
      res.status(500).send({
        message: "Error retrieving List of Articles",
      })
    );
};

/**
 * Returns a specific article
 *
 * @param {Object} req - The HTTP request to get a specific article
 * @param {string} req.params.id - The article ID
 * @param {Object} res - The HTTP response containing one article
 */

exports.findOne = (req, res) => {
  const myId = req.params.id;

  Article.findByPk(myId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + myId,
      });
    });
};

/**
 * Removes the article with the provided ID
 *
 * @param {Object} req - The HTTP request to delete an article
 * @param {string} req.params.id - The article ID
 * @param {Object} res - The HTTP response
 */

exports.trash = (req, res) => {
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

      Article.findByPk(myId)
        .then((data) => {
          if (!data) {
            return res.status(404).json({ error: "Article not found" });
          }
          if (data.author == myUsername || myUserRole == "moderator") {
            if (data.image) {
              const filename = data.image.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                Article.destroy({
                  where: {
                    id: myId,
                  },
                }).then(res.status(200).send({ message: "Article delete!" }));
              });
            } else {
              Article.destroy({
                where: {
                  id: myId,
                },
              }).then(res.status(200).send({ message: "Article delete!" }));
            }
          } else {
            return res.status(401).json({ error: "Unauthorized client" });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch();
};
