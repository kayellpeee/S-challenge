angular.module('slack.display', [])
.controller('DisplayController', function($scope, Source){
  $scope.data;

  setTimeout(function(){
    $scope.data = Source.displaySource();
    countTags($scope.data.source);
    $scope.$digest();
  }, 1500)

  $scope.tags = {};

  var countTags = function(HTMLString){
    var tagname;
    var grabTagName = false;

    for( var i = 0; i < HTMLString.length; i++ ){
      if( HTMLString[i] === ">" || HTMLString[i] === " " ){
        if( $scope.tags[tagname] ){
          $scope.tags[tagname]++;
        }else if( tagname !== undefined ){
          $scope.tags[tagname] = 1;
        }
        grabTagName = false;
      }
      if( grabTagName ){
        tagname += HTMLString[i];
      }
      if( HTMLString[i] === "<" && HTMLString[i + 1] !== "/" && HTMLString[i + 1] !== "!" ){
        tagname = "";
        grabTagName = true;
      }
    }
  };

});
