const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

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
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((error) =>
        res.status(500).json({ error: "Erreur dans la base de données!" })
      );
  } else {
    return res
      .status(401)
      .json({ error: "Remplissez chaque champ s'il vous plait" });
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
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, data.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Mot de passe incorrect !" });
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
        .catch((error) =>
          res.status(500).json({ error: "Erreur dans la base de données !" })
        );
    })
    .catch((error) => res.status(400).json({ error: "Not found" }));
};

exports.deleteOne = (req, res) => {
  const myId = req.body.myUserId;
  const myPwd = req.body.myUserPassword;
  User.findByPk(myId).then((data) => {
    if (!data) {
      return res.status(404).json({ error: "Utilisateur non trouvé !" });
    }
    bcrypt
      .compare(myPwd, data.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
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
        res.status(500).json({ error: "Erreur mot de passe !" });
      });
  });
};
