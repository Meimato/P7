const db = require("../models");
const Article = db.articles;
const User = db.users;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.create = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

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
        likes: 0,
        dislikes: 0,
      };

      Article.create(article)
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((err) =>
          res.status(500).send({ message: "Error during article creation" })
        );
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Username",
      });
    });
};

exports.findAll = (req, res) => {
  Article.findAll()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message: "Error retrieving List of Articles",
      })
    );
};

exports.findOne = (req, res) => {
  const myId = req.params.id;

  Article.findByPk(myId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + myId,
      });
    });
};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};
