'use strict'

angular.module('starter.controllers')

.controller('SubscribedFriendsCtrl', ['$scope','UserService','$filter', function($scope, UserService,$filter){
  $scope.initSubscribedFriends = function(){
    $scope.$watch(UserService.friends, function(friends){
      if(friends){
        $scope.friends = $filter('filter')(friends,{installed:true});
      }
    })
  }
}])