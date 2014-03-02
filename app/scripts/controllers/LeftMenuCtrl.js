'use strict';

angular.module('starter.controllers')

.controller('leftMenuCtrl', ['$scope','UserService','$state',function($scope,UserService,$state) {
  $scope.$on('toggleSideMenu',function(){
    $scope.sideMenuController.toggleLeft();
  })

  $scope.$on('closeSideMenu',function(){
    $scope.sideMenuController.close();
  })

  // CloseMenu
  $scope.closeMenu = function(st) {
    $scope.sideMenuController.close();
    $state.go(st);
  };

  $scope.logout = function() {
    UserService.logout(function() {
      $state.go('login');
    });
  }

  $scope.login = function() {
    UserService.login();
  };
}])