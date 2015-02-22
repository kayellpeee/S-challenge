angular.module('slack.display', [])
.controller('DisplayController', function($scope, Storage){
  $scope.data = Storage.data;

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

  countTags($scope.data.source);

});
