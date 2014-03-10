'use strict';

angular.module('starter.controllers')

.controller('HomeCtrl',['$scope','UserService','$state', 'PaceService','$rootScope',function($scope, UserService,$state,PaceService,$rootScope){
  $scope.paceStart = function(){
    PaceService.start()
  }
  $scope.login = function() {
    UserService.login();
  };

  $scope.toIntro = function(){
    window.localStorage['didTutorial'] = 'false';
    $rootScope.$broadcast('closeSideMenu');
    $state.go('menu.intro');
  }
}])