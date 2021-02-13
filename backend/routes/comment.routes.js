module.exports = (app) => {
    const comments = require("../controllers/comment.controller.js");
    const auth = require("../middleware/auth.js");

    var router = require("express").Router();

    router.post("/write", auth.verifyToken, comments.writeComment);
    router.get("/read/:id", auth.verifyToken, comments.readComments);
    router.delete("/delete/:id", auth.verifyToken, comments.trashComment);

    app.use("/api/comment", router);
};