var express = require('express')
var routes = require('./server/config/routes.js');
var utils = require('./server/config/utils.js');

var app = require('./server/config/middleware.js');
var port = process.env.PORT || 3000;

// serve up frontend and listed for POST reqs to /fetch
app.use(express.static(__dirname + '/client'));
app.post('/fetch', routes.fetch);
app.use(utils.errorHandler);

app.listen(port);
