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

app.use(bodyParser.json());

// DB Connection

// Routes

/**
 * User Route
 *
 * Signup
 * Login
 */
app.post("/api/auth/login", (req, res) => {
  res.json({ username: "TestUsername", password: "12345" });
});
app.post("/api/auth/signup", (req, res) => {
  res.json({ username: "RegisteredUsername", password: "67890" });
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

app.get("/api/article/");

/**
 * Article model
 *
 * Author REQ
 * Title REQ
 * Description REQ
 * Date REQ
 * Comments NULL [Array Article]
 * Image NULL
 * Link NULL
 * Likes = 0
 * Dislikes = 0
 * UserLikes [Array userIDs]
 * UserDislikes [Array userIDs]
 */

module.exports = app;
