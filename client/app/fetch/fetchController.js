angular.module('slack.fetch', [])
.controller('FetchController', function($scope, $location, UpdateStorage){
  $scope.data = {};

  $scope.getSource = function(){
    UpdateStorage.newHTMLSource($scope.data);
  };

});
