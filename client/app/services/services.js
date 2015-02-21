angular.module('slack.services', [])
.factory('Source', function($http){
  var getHTMLSource = function(data){
    return $http({
      method: 'POST',
      url: '/fetch',
      data: data
    });
  };

  return {
    getHTMLSource: getHTMLSource
  };
});