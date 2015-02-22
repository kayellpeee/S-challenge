angular.module('slack', [
  'slack.fetch',
  'slack.display',
  'slack.services',
  'ui.router'
  ])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/fetch");

  // 2 views - one for user input, the other to display the summary/source code
  $stateProvider
    .state('fetch', {
      url: '/fetch',
      controller: 'FetchController',
      templateUrl: 'app/fetch/fetch.html'
    })
    .state('display', {
      url: '/display',
      controller: 'DisplayController',
      templateUrl: 'app/display/display.html'
    });
});