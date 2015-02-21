angular.module('slack', [
  'slack.fetch',
  'slack.display',
  'ui.router'
  ])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/fetch");

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