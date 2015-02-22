var utils = {};

// basic error handling
utils.errorHandler = function(err, req, res, next){
  res.status(400).json( {error: err.message} );
};

module.exports = utils;