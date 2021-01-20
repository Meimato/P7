module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", users.create);
  router.post("/login", users.findOne);

  app.use("/api/auth", router);
};
