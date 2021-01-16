const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.users;

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
          .then((data) => {
            res.status(201).send(data);
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    console.log("ERROR: Please fill all the fields!");
  }
};

exports.findOne = (req, res) => {

  User.findAll({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => res.status(200).send(data) )
    .catch((error) => res.status(400).json({ error }));
};
