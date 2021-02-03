module.exports = (app) => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");
  const multer = require("../middleware/multer-config.js");

  router.post("/write", auth.verifyToken, multer, articles.create);
  router.get("/", auth.verifyToken, articles.findAll);
  router.get("/:id", auth.verifyToken, articles.findOne);
  router.delete("/:id", auth.verifyToken, articles.trash);

  app.use("/api/article", router);
};
