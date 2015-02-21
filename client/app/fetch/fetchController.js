angular.module('slack.fetch', [])
.controller('FetchController', function($scope, $location, Source){
  $scope.data = {};

  $scope.getSource = function(){
    Source.getHTMLSource($scope.data);
    $location.path("/display");
  };

});
