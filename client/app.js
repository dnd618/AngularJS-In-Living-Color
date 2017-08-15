var app = angular.module('myApp', ["ngRoute",]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "../views/list.html",
    })
    .when("/single/:id", {
        templateUrl: '../views/single.html',
    })
    .when("/actor/:actor", {
        templateUrl: '../views/actor.html'
    });
})
    .run(function($rootScope){
        $rootScope.api = 'http://localhost:3000/api/characters';
});

app.controller("ListController", ['$rootScope', '$http', '$scope', '$location', function($rootScope, $http, $scope, $location){
    console.log('in my list');
    $http.get($rootScope.api)
    .then(function(response){
        console.log(response.data);
        $scope.listAll = response.data;
    })
    $scope.oneChar = function(id){
        $location.path('/single/' + id)
    };
    $scope.oneActor = function(actor){
        $location.path('/actor/' + actor)
    };
}]);

app.controller('SingleController', ['$rootScope', '$scope', '$routeParams', '$http', function($rootScope, $scope, $routeParams, $http){
    id = $routeParams.id;    
    $http.get($rootScope.api +'/one/' +id)
    .then(function(response){
        $scope.character = response.data;
        console.log('single loaded');
    })
}])

app.controller('ActorController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function($scope, $routeParams, $http, $rootScope, $location){
    $rootScope.hideIt = false;
    actor = $routeParams.actor;
    $http.get($rootScope.api + '/actor/' + actor)
    .then(function(response){
        console.log(response);
        console.log(response.data);
        $scope.allActor = response.data;
    })
}])