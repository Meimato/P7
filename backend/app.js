const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Connection
const db = require("./models/index.js");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use('/images', express.static(path.join(__dirname, 'images')))

require("./routes/user.routes.js")(app);
require("./routes/article.routes.js")(app);

module.exports = app;
