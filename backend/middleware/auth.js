const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  try {
    const myAuth = JSON.parse(req.headers.authorization);
    const decodedToken = jwt.verify(myAuth.token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (myAuth.userId && myAuth.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const auth = {
  verifyToken,
  isModerator
}

module.exports = auth;