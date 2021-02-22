const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;

/**
 * Encrypts the user's password, adds the user to the database
 * 
 * @param {Object} req - The HTTP request to register the user's account
 * @param {string} req.body.username - The username
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user password
 * @param {Object} res - The HTTP response
 */

exports.create = (req, res) => {
  const myUsername = req.body.username;
  const myEmail = req.body.email;
  const myPassword = req.body.password;

  if (myUsername !== "" && myEmail !== "" && myPassword !== "") {
    bcrypt
      .hash(myPassword, 10)
      .then((hash) => {
        const user = {
          username: myUsername,
          email: myEmail,
          password: hash,
        };
        User.create(user)
          .then((user) => {
            user.setRoles([1]).then(() => {
              res
                .status(200)
                .send({ message: "User was registered successfully!" });
            });
          })
          .catch(() => {
            res.status(404).send({ error: "Database error!" });
          });
      })
      .catch(() =>
        res.status(500).json({ error: "Error during encryption!" })
      );
  } else {
    return res
      .status(401)
      .json({ error: "Please fill each field" });
  }
};

/**
 * Verifies user's credentials,
 * returning the user's identifier from the database data and the associated authentication token 
 *
 * @param {Object} req - The HTTP request to login using user's credentials
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user password
 * @param {Object} res - The HTTP response
 * 
 * @returns {Object} User - The informations about the user
 * @returns {string} User.username - The username
 * @returns {string} User.email - The user email
 * @returns {number} User.userId - The user identification number
 * @returns {Array} User.roles - The roles assigned to the user
 * @returns {string} User.token - The authentication token
 * 
 */

exports.findOne = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, data.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Wrong password!" });
          }
          var permissions = [];
          data.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              permissions.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).json({
              username: data.username,
              email: data.email,
              userId: data.id,
              roles: permissions,
              token: jwt.sign({ userId: data.id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          });
        })
        .catch(() => res.status(404).json({ error: "Error during comparison!" })
        );
    })
    .catch(() => res.status(500).json({ error: "Database error!" }));
};

/**
 * Removes the user with the provided ID
 * 
 * @param {Object} req - The HTTP request to delete the user
 * @param {String} req.body.myUserId - User's ID
 * @param {String} req.body.myUserPassword - User's password
 * @param {Object} res - The HTTP response
 * 
 */

exports.deleteOne = (req, res) => {
  const myId = req.body.myUserId;
  const myPwd = req.body.myUserPassword;
  User.findByPk(myId).then((data) => {
    if (!data) {
      return res.status(404).json({ error: "User not found!" });
    }
    bcrypt
      .compare(myPwd, data.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).send({ error: "Wrong password!" });
        }
        User.destroy({
          where: {
            id: myId,
          },
        }).then(() => {
          res.status(200).send({ message: "User deleted!" });
        });
      })
      .catch(() => {
        res.status(500).json({ error: "Error during comparison!" });
      });
  });
};
