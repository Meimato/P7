const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Username is already taken." });
      }
      return;
    })
    .catch(() => {
      res.status(500).send({ message: "Database Error." });
    });

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Email is already registered." });
      }
      return;
    })
    .catch(() => {
      res.status(500).send({ message: "Database Error." });
    });

  next();
};
