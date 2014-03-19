var blogControllers = angular.module('blogControllers', ['ui.bootstrap']);


//Recent Posts
blogControllers.controller('BlogCtrl', function ($scope, $http){
	$http({method: 'get', url:'/posts'}).
	success(function(data, status, headers, config){
		$scope.posts = data;
	}).
	error(function(data, status, headers, config){

	});
});


//Write Posts
blogControllers.controller('writeCtrl', function ($scope, $http){
	$scope.formData = {};
	$scope.inserted = {};

	$scope.createPost = function() {
		$http.post('/posts', $scope.formData).
		success(function(data){
			$scope.inserted = data;
		}).
		error(function(err){
			console.log(err);
		});
	};
});


//Write Comment
blogControllers.controller('writeCommCtrl', function ($modal, $scope, $http){
	$scope.formData = {};
	$scope.inserted = {};

	$scope.open = function(){
		var modalInstance = $modal.open({
			templateUrl: '/../partials/write-comm.html',
			controller: 'ModalInstanceCtrl',
			resolve:{

			}
		});
	}

	$scope.createComment = function() {
		$http.post('/comments', $scope.formData).
		success(function(data){
			$scope.inserted = data;
		}).
		error(function(err){
			console.log(err);
		});
	};
});

blogControllers.controller('ModalInstanceCtrl', function($modalInstance, $scope, $http, post){
	$scope.comment = {};

	$scope.ok = function(){
		$scope.comment.post_id = post._id;
		$scope.comment.postDate = new Date();
		console.log($scope.comment);
		$http.post('/comments', $scope.comment).
		success(function(data){
			console.log("Inserted: "+ data);
		}).
		error(function(err){
			console.log(err);
		});
		$modalInstance.close();
	};

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	}
});


//Login Contorl
//NOT WORKING
blogControllers.controller('loginCtrl', function ($scope, $http){
	$scope.formData = {};

	$scope.checkAuth = function() {
		$http.post('/posts', $scope.formData).
		success(function(data){
			$scope.inserted = data;
		}).
		error(function(err){
			console.log(err);
		});
	};
});

//Individual post controller
blogControllers.controller('postCtrl', function ($scope, $http, $routeParams, $modal){

	$http({method: 'get', url:'/posts/'+$routeParams.postId}).
	success(function(data, status, headers, config){

		$scope.post = data[0];
	}).
	error(function(data, status, headers, config){
		alert(status);
	});

		$scope.open = function(){
		var modalInstance = $modal.open({
			templateUrl: '/../app/partials/write-comm.html',
			controller: 'ModalInstanceCtrl',
			resolve:{
				post: function(){
					return angular.copy($scope.post);
				}
			}
		});
	}

});