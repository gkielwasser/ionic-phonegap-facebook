'use strict';

angular.module('starter.controllers')

.controller('HomeCtrl',['$scope','UserService','$state', 'PaceService',function($scope, UserService,$state,PaceService){
  $scope.paceStart = function(){
    PaceService.start()
  }
  $scope.login = function() {
    UserService.login();
  };

  $scope.toIntro = function(){
    window.localStorage['didTutorial'] = 'false';
    $scope.$broadcast('closeSideMenu');
    $state.go('menu.intro');
  }
}])