angular.module('slack.fetch', [])
.controller('FetchController', function($scope, $location, UpdateStorage){
  $scope.data = {};

  // update source (called on submit)
  $scope.getSource = function(){
    UpdateStorage.newHTMLSource($scope.data);
  };
});
