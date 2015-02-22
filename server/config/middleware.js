var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

// setup CORS headers (for dev, don't know deployment url yet)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// expose app for use in server.js
module.exports = app;