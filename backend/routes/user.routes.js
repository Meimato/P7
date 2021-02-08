module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  const verifySignUp = require("../middleware/verifySignUp.js");
  const auth = require("../middleware/auth.js");
  var router = require("express").Router();

  router.post(
    "/signup",
    verifySignUp,
    users.create
  );
  router.post("/login", users.findOne);
  router.delete("/delete", auth.verifyToken, users.deleteOne);
  app.use("/api/auth", router);
};
