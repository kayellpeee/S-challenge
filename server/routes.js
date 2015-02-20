var bodyParser = require('body-parser')
var request = require('request')

var routes = {};

routes.fetch = function(req, res, next){
  request('http://www.google.com', function(error, response, body){
    console.log('**here**\n', body)
  })
};

module.exports = routes;