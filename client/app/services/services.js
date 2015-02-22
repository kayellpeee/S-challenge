angular.module('slack.services', [])

// factory to pass data between controllers
.factory('Storage', function($http){
  var data = {};
  return { data: data };
})

// separate factory to update the storage & then reroute
// (called in fetchController when user submits form)
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

/*****************************************************************
 * this service parses stringified HTML & returns:               *
 *  - a list of tags and their frequency                         *
 *  - stringified HTML where all tags are wrapped in "<pre" tags *
 *****************************************************************/
.factory('Parser', function(){
  var parseHTML = function(HTMLString){
    var templateString = "";
    var openingTagIndex;
    var closingTagIndex;
    var tags = {};
    var tagname;
    var grabTagName = false;
    var searchForClosingTagIndex = false;


    /*************************************************************
     * use a 'for' loop over regex because http://stackoverflow. *
     * com/questions/1732348/regex-match-open-tags-except-xhtml- *
     * self-contained-tags                                       *
     *************************************************************/

    for( var i = 0; i < HTMLString.length; i++ ){
      // start by looking for "<", as they signify the start of an HTML element
      if( HTMLString[i] === "<" ){
        // if "</" then look for associated ">"
        if( HTMLString[i + 1] === "/" ){
          searchForClosingTagIndex = true;
        }else if( HTMLString[i + 1] !== "!" ){
          // don't handle comments or <!DOCTYPE ...>
          tagname = "";
          grabTagName = true;
          openingTagIndex = i;
          continue;
        }
      }

      // if ">" or " " then stop tracking the tagname & its increment counter
      if( HTMLString[i] === ">" || HTMLString[i] === " " ){
        if( tags[tagname] ){
          tags[tagname]++;
        }else if( tagname !== undefined ){
          tags[tagname] = 1;
        }
        grabTagName = false;
      }

      // if we've found a "<" beforehand then continue grabbing the tagname
      if( grabTagName ){
        tagname += HTMLString[i];
      }

      // if searching for ">" & found it, then wrap the whole element in
      // a <pre> tag & add it to template string
      if( searchForClosingTagIndex ){
        if( HTMLString[i] === ">" ){
          searchForClosingTagIndex = false;
          closingTagIndex = i;
          var body = HTMLString.slice(openingTagIndex, closingTagIndex + 1);

          templateString += '<pre class="' + tagname + '">'
            // escape < & > — want to display the source, not render it 
            + body.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            + '</pre>';
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