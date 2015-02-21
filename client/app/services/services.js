angular.module('slack.services', [])
.factory('Source', function($http){
  var html = {};

  var getHTMLSource = function(data){
    return $http({
      method: 'POST',
      url: '/fetch',
      data: data
    }).then(function(response){
      html = response.data;
    });
  };

  var displaySource = function(){
    return html;
  };

  return {
    getHTMLSource: getHTMLSource,
    displaySource: displaySource
  };
});