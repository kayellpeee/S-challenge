angular.module('slack.services', [])
.factory('Storage', function($http){
  var data = {};
  return { data: data };
})
.factory('UpdateStorage', function(Storage, $http, $location){
  var newHTMLSource = function(data){
    return $http({
      method: 'POST',
      url: '/fetch',
      data: data
    }).then(function(response){
      Storage.data = response.data;
      $location.path("/display");
    });
  };

  return { newHTMLSource: newHTMLSource };
})
.factory('Parser', function(){
  var parseHTML = function(HTMLString){
    var templateString = "";
    var openingTagIndex;
    var closingTagIndex;
    var tags = {};
    var tagname;
    var grabTagName = false;
    var searchForClosingTagIndex = false;

    for( var i = 0; i < HTMLString.length; i++ ){
      if( HTMLString[i] === ">" || HTMLString[i] === " " ){
        if( tags[tagname] ){
          tags[tagname]++;
        }else if( tagname !== undefined ){
          tags[tagname] = 1;
        }
        grabTagName = false;
      }
      if( searchForClosingTagIndex ){
        if( HTMLString[i] === ">" ){
          searchForClosingTagIndex = false;
          closingTagIndex = i;
          var body = HTMLString.slice(openingTagIndex, closingTagIndex + 1);
          templateString += '<pre class="' + tagname + '">'
            + body.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            + '</pre>';
        }
      }
      if( grabTagName ){
        tagname += HTMLString[i];
      }
      if( HTMLString[i] === "<" ){
        if( HTMLString[i + 1] === "/" ){
          searchForClosingTagIndex = true;
        }else if( HTMLString[i + 1] !== "!" ){
          tagname = "";
          grabTagName = true;
          openingTagIndex = i;
        }
      }
    }
    return {
      tags: tags,
      templateString: templateString
    };
  };

  return { parseHTML: parseHTML };
});