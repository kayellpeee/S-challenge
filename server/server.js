var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./config/routes.js');
var utils = require('./config/utils.js');

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.post('/fetch', routes.fetch);
app.use(utils.errorHandler);

app.listen(3000);
