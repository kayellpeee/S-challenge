var express = require('express')
var routes = require('./config/routes.js');
var utils = require('./config/utils.js');

var app = require('./config/middleware.js');

app.use(express.static(__dirname + '/../client'));
app.post('/fetch', routes.fetch);
app.use(utils.errorHandler);

app.listen(3000);
