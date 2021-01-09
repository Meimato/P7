const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// DB Connection

// Routes

/**
 * User Route
 * 
 * Signup
 * Login
 */

/**
 * Article Route
 * 
 * get all
 * get one
 * create
 * delete
 * modify
 * setlike
 * 
 */

/**
 * Article model
 * 
 * Author REQ
 * Title REQ
 * Description REQ
 * Date REQ
 * Comments NULL [Array Article]
 * Image NULL
 * Link NULL
 * Likes = 0
 * 
 */

module.exports = app;