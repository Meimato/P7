module.exports = (app) => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");
  const multer = require("../middleware/multer-config.js");

  router.post("/write", auth, multer, articles.create);
  router.get("/", auth, articles.findAll);
  router.get("/:id", auth, articles.findOne);

  app.use("/api/article", router);
};
