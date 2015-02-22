angular.module('slack.display', [])
.controller('DisplayController', function($scope, Storage, Parser){
  $scope.data = Storage.data;
  $scope.parsedSourceCode = Parser.parseHTML($scope.data.source);
  $scope.tags = $scope.parsedSourceCode.tags;
  $scope.templateString = $scope.parsedSourceCode.templateString;
});
