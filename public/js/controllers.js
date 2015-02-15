var nflApp = angular.module('nflApp', []);

nflApp.controller('IndexController', ['$scope', '$http', '$filter',
    function($scope, $http, $filter) {
        $scope.nfl = {};
        $scope.tradeTeamOne = {};
        $scope.tradeTeamTwo = {};
        $scope.pageView = 'teams';
        $scope.currentTeam = '';
        $scope.currentTeamInfo = {};
        $scope.searchText = '';

        $scope.getNflJson = function() {
            $http.get('nfl.json').success(function(json) {
                $scope.nfl = json;
            })
        };

        $scope.getNflJson();

        $scope.displayTeam = function(event) {
            var newTeam = $(event.target)[0].innerHTML;
            $scope.currentTeam = newTeam;
            $scope.currentTeamInfo = $filter('filter')($scope.nfl.teams, function(team) {
                return team.name === newTeam;
            })[0];
        }
    }
]);

nflApp.directive('sidebar', function() {
    return {
        controller: 'IndexController',
        restrict: 'E',
        replace: true,
        templateUrl: 'sidebar.html'
    }
});

nflApp.directive('navbar', function() {
    return {
        controller: 'IndexController',
        restrict: 'E',
        replace: true,
        templateUrl: 'navbar.html'
    }
});

nflApp.directive('indexBody', function() {
    return {
        controller: 'IndexController',
        restrict: 'E',
        replace: true,
        templateUrl: 'indexBody.html'
    }
});