var request = require('request');

var routes = {};

routes.fetch = function(req, res, next){
  if( req.body.url === undefined ){
    next(new Error("Please provide URL"));
  }else{
    request(req.body.url, function(error, response, body){
      if(error) { next(error); }
      var data = JSON.stringify(body);
      res.status(200).json( {source: data} );
    })
  }
};

module.exports = routes;