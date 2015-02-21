angular.module('slack.display', [])
.controller('DisplayController', function($scope, Source){
  $scope.data;

  setTimeout(function(){
    $scope.data = Source.displaySource();
    console.log($scope.data);
    $scope.$digest();
  }, 1500)

});
