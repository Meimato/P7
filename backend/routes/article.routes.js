module.exports = (app) => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");

  router.post("/write", auth, articles.create);
  router.get("/", auth, articles.findAll);
  router.get("/:id", auth, articles.findOne);

  app.use("/api/article", router);
};
