const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("./routes/user.routes.js")(app);

// Routes

/**
 * User Route
 *
 * Signup
 * Login
 */

app.post("/api/auth/login", (req, res) => {
  res.json( req.body );
});

app.post("/api/auth/signup", (req, res) => {
  res.json( req.body );
});

/**
 * Article Route
 *
 * get all
 * get one
 * create
 * delete
 * modify
 * setlike
 *
 */

app.get("/", (req, res) => {
  res.json({ msg: "HELLO!"});
});

module.exports = app;
