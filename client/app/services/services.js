angular.module('slack.services', [])
.factory('Storage', function($http){
  var data = {};
  return { data: data };
})
.factory('UpdateStorage', function(Storage, $http, $location){
  var newHTMLSource = function(data){
    return $http({
      method: 'POST',
      url: '/fetch',
      data: data
    }).then(function(response){
      Storage.data = response.data;
      $location.path("/display");
    });
  };

  return { newHTMLSource: newHTMLSource };
});