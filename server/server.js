var express = require('express');
var routes = require('./routes.js');

var app = express();

app.post('/fetch', routes.fetch);

app.listen(3000);
