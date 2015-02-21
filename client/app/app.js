angular.module('slack', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/fetch");

  $stateProvider
    .state('fetch', {
      url: '/fetch',
      controller: 'FetchController',
      templateUrl: 'fetch/fetch.html'
    })
    .state('display', {
      url: '/display',
      controller: 'DisplayController',
      templateUrl: 'display/display.html'
    });
});