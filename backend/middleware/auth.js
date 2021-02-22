const jwt = require("jsonwebtoken");

/**
 * Verifies user token
 * 
 * @param {Object} req - The HTTP request
 * @param {string} req.headers.authorization - The user token
 * @param {Object} res - The HTTP response
 */

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

const auth = {
  verifyToken,
}

module.exports = auth;