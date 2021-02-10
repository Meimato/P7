const db = require("../models");
const Article = db.article;
const User = db.user;

const Op = db.Sequelize.Op;
const fs = require("fs");

exports.create = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file ? `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }` : null;

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
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Article.findAll({ where: condition })
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

exports.trash = (req, res) => {
  const myId = req.params.id;

  Article.findByPk(myId)
    .then((data) => {
      if (data.image) {
        const filename = data.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Article.destroy({
            where: {
              id: myId,
            },
          })
            .then(res.status(200).send({ message: "Article delete!" }))
        });
      } else {
        
        Article.destroy({
          where: {
            id: myId,
          },
        })
          .then(res.status(200).send({ message: "Article delete!" }))
      }

    })
    .catch((error) => res.status(500).json({ error }));
};
