const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Connection
const db = require("./models/index.js");
const Role = db.role;
const User = db.user;
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  createRoles();
  initializeDatabase();
});

function createRoles() {
  Role.create({
    id: 1,
    name: "user",
  })
    .then()
    .catch();

  Role.create({
    id: 2,
    name: "moderator",
  })
    .then()
    .catch();
}

function initializeDatabase() {
  bcrypt
    .hash("moderator_password", 10)
    .then((hash) => {
      User.create({
        id: 1,
        username: "moderator",
        email: "moderator@email.com",
        password: hash,
      })
        .then((user) => {
          user.setRoles([2]);
        })
        .catch();
    })
    .catch();

  bcrypt
    .hash("user_password", 10)
    .then((hash) => {
      User.create({
        id: 2,
        username: "user_test",
        email: "test_user@gmail.com",
        password: hash,
      })
        .then((user) => {
          user.setRoles([1]);
        })
        .catch();
    })
    .catch();

  bcrypt
    .hash("fff", 10)
    .then((hash) => {
      User.create({
        id: 3,
        username: "Foo",
        email: "foo@bar.com",
        password: hash,
      })
        .then((user) => {
          user.setRoles([1]);
        })
        .catch();
    })
    .catch();
}

app.use("/images", express.static(path.join(__dirname, "images")));

require("./routes/user.routes.js")(app);
require("./routes/article.routes.js")(app);
require("./routes/comment.routes.js")(app);

module.exports = app;
