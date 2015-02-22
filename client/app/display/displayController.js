angular.module('slack.display', [])
.controller('DisplayController', function($scope, Storage, Parser){
  $scope.data = Storage.data;
  $scope.parsedSourceCode = Parser.parseHTML($scope.data.source);
  $scope.tags = $scope.parsedSourceCode.tags;
})
.directive('parsedSourceCode', function(Storage, Parser){
  var parsedSourceCode = Parser.parseHTML(Storage.data.source);
  console.log(parsedSourceCode.templateString)
  return {
    restrict: 'E',
    template: parsedSourceCode.templateString
  };
});
