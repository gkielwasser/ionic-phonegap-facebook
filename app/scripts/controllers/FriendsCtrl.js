'use strict';

angular.module('starter.controllers')

.controller('FriendsCtrl', ['$scope','UserService','$timeout','$q','$filter',function($scope,UserService,$timeout,$q,$filter) {
  $scope.initFriendsCtrl = function(friends){
    $scope.initFriendsPartial(friends);

    /*
    $scope.list = [];
    scope.friends=[];
    for (var i = 0; i < 1000; i++) {
      $scope.list.push({
        id: i,
        name: 'Name ' + i,
        detail: 'Detail ' + i
      });
    }
    */
  }

  $scope.initFriendsPartial = function(friends){
    $scope.friends = friends;
    // Pagination in controller
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    $scope.filterFriends();
    $scope.updateNumberOfPages();
  }

  var rightButtons = [
    {
      content: 'Annuler',
      tap: function(e) {
        $scope.reset();
      }
    }
  ];

  var enableCancelButton = function(enable){
    if(enable){
      $scope.rightButtons = rightButtons;
    }
    else{
      delete $scope.rightButtons;
    }
  }

  $scope.filterFriends = function(){
    $scope.filteredFriends = $filter('startFrom')(
      $filter('limitTo')(
        $filter('friendsSearch')(
          $scope.friends, $scope.search),
          $scope.currentPage +1 * $scope.pageSize),
          $scope.currentPage);
  }

  $scope.updateNumberOfPages = function(length){
    $scope.numberOfPages = Math.ceil($filter('friendsSearch')($scope.friends,$scope.search).length/ $scope.pageSize);
  }

  $scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
  }
  $scope.nextPage = function(){
    $scope.currentPage ++;
    $scope.filterFriends();
    $scope.$broadcast('scroll.scrollTop');
  }
  $scope.previousPage = function(){
    $scope.currentPage --;
    $scope.filterFriends();
    $scope.$broadcast('scroll.scrollTop');
  }

  $scope.searching = function(search){
    $scope.search = search;
    $scope.$broadcast('scroll.scrollTop');
    $scope.currentPage = 0;
    $scope.filterFriends();
    $scope.updateNumberOfPages();
  }

  $scope.reset= function(){
    angular.forEach($scope.friends, function(value){
      value.enabled = false;
    })
  }

  $scope.addFriend=function(friend,event){
    if(event.target.tagName != 'INPUT'){
      if(friend.enabled){
        friend.enabled = false;
      }
      else{
        friend.enabled = true;
      }
    }
    else{
      console.log("ignore")
    }
  }

  $scope.getSelectedFriend = function(){
    return $filter('filter')($scope.friends,{enabled:true});
  }

  $scope.sendFriendsInvitation = function(message){
    UserService.sendFriendsInvitation($scope.getSelectedFriend(),message);
  }


  /* WATCHERS */
  $scope.$watch(UserService.friends, function(friends){
    if(friends){
      $scope.initFriendsCtrl(friends);
    }
  })

  $scope.$watch("friends",function(value){
    $scope.filterFriends();
    //Masquer bouton Annuler
    if($scope.getSelectedFriend() && $scope.getSelectedFriend().length == 0){
      enableCancelButton(false);
    }
    else if (!$scope.rightButtons && $scope.getSelectedFriend() && $scope.getSelectedFriend().length > 0)  enableCancelButton(true);
  },true)
}])
