angular.module('slack.display', [])
.controller('DisplayController', function($scope, Storage, Parser){
  $scope.highlight = function(tagname){
    var elements = document.getElementsByClassName(tagname);

    [].forEach.call(elements, function(element){
      var highlightClass = " highlight";
      var isHighlighted = element.className.indexOf(highlightClass);

      if( isHighlighted > 0 ){
        element.className = tagname;
      }else{
        element.className += highlightClass;
      }
    });
  };
  $scope.data = Storage.data;
  $scope.parsedSourceCode = Parser.parseHTML($scope.data.source);
  $scope.tags = $scope.parsedSourceCode.tags;
})
.directive('parsedSourceCode', function(Storage, Parser){
  var parsedSourceCode = Parser.parseHTML(Storage.data.source);
  return {
    restrict: 'E',
    template: parsedSourceCode.templateString
  };
});
