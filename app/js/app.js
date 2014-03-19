var blogApp = angular.module('blogApp', [
	'ngRoute',
	'blogControllers',
	'ui.bootstrap']);

blogApp.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'app/partials/post-list.html',
			controller: 'BlogCtrl'
		}).when('/login', {
			templateUrl: 'app/partials/login.html',
			controller: 'loginCtrl'
		}).when('/writePost', {
			templateUrl: 'app/partials/write-post.html',
			controller: 'writeCtrl'
		}).when('/post/:postId', {
			templateUrl: 'app/partials/post-view.html',
			controller: 'postCtrl'
		}).otherwise({
			redirectTo: '/'
		});
	});