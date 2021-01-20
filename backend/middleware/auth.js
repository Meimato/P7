const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const myAuth = JSON.parse(req.headers.authorization);
    const decodedToken = jwt.verify(myAuth.token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
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
