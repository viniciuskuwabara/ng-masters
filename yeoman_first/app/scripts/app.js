'use strict';

angular
  .module('mytodoApp', [
    'ngCookies',
	'ngAnimate',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.sortable',
	'LocalStorageModule'
  ])

  .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('ls');
  }]);
