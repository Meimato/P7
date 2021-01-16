const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: process.env.PASSWORD,
  DB: "groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
