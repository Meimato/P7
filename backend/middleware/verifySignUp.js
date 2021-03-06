const db = require("../models");
const User = db.user;

/**
 * Checks if the user name or email has already been registered
 * 
 * @param {Object} req - The HTTP request
 * @param {string} req.body.username - The username
 * @param {string} req.body.email - The user mail
 * @param {Object} res - The HTTP response
 * @param {Object} next - The next function
 */

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
