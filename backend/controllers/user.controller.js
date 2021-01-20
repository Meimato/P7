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
            res.status(201).json({
              userId: data.id,
              token: jwt.sign({ userId: data.id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) =>
            res.status(400).json({ error: "Cannote create the user" })
          );
      })
      .catch((error) => res.status(500).json({ error: "Database error!" }));
  } else {
    return res
      .status(401)
      .json({ error: "Remplissez chaque champ s'il vous plait!" });
  }
};

exports.findOne = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, data.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect ! " });
          }
          res.status(200).json({
            userId: data.id,
            token: jwt.sign({ userId: data.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) =>
          res.status(500).json({ error: "Erreur de la base de donnée ! " })
        );
    })
    .catch((error) => res.status(400).json({ error: "Not found" }));
};
