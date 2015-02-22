angular.module('slack.display', [])
.controller('DisplayController', function($scope, Storage, Parser){
  // shouldn't be here but this I'm starting to put too much time into this
  // adds "highlight" class to all similar elements in the source code
  $scope.highlight = function(tagname){
    var elements = document.getElementsByClassName(tagname);

    [].forEach.call(elements, function(element){
      var highlightClass = " highlight";
      var isHighlighted = element.className.indexOf(highlightClass);

      // if already highlighted, remove
      if( isHighlighted > 0 ){
        element.className = tagname;
      }else{
        element.className += highlightClass;
      }
    });
  };

  // find & display all tags & they're frequency
  $scope.parsedSourceCode = Parser.parseHTML(Storage.data.source);
  $scope.tags = $scope.parsedSourceCode.tags;
})

// parse the source code & use returned template string for directive
.directive('parsedSourceCode', function(Storage, Parser){
  var parsedSourceCode = Parser.parseHTML(Storage.data.source);
  return {
    restrict: 'E',
    template: parsedSourceCode.templateString
  };
});
