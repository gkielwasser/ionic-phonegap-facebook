'use strict';

angular.module('starter.controllers')

.controller('FriendsCtrl', ['$scope','UserService','$timeout','$q','$filter',function($scope,UserService,$timeout,$q,$filter) {
    $scope.currentPage = 0;
    $scope.pageSize = 15;

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
    /*Performance: travailler sur une copie locale du tableau : on ne veut pas travailler directement sur l'objet user.friends*/
    $scope.friends = angular.copy(friends);
    //$scope.friends = friends;

    // Pagination in controller

    //$scope.filterFriends();
    //$scope.updateNumberOfPages();
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
    var count = 0;
    $scope.loadMore = function() {

      console.log("Load more:", count,"page:",$scope.currentPage,"limit",$scope.currentPage  * $scope.pageSize)
      $scope.nextPage();
  $scope.filterFriends();
      //$scope.filteredFriends = $filter('limitTo')($scope.friends,$scope.currentPage +1 * $scope.pageSize);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      count++;
      if($scope.friends && ($scope.filteredFriends == $scope.friends.length)){
        console.log("No more scroll!!!");
        $scope.noMoreScroll = true;
      }
    };

  $scope.filterFriends = function(){
    console.log("before",$scope.friends,$scope.currentPage  * $scope.pageSize)
    $scope.filteredFriends = $filter('limitTo')($scope.friends,$scope.currentPage +1  * $scope.pageSize);
    console.log("filteredFriends",$scope.filteredFriends);
    /*
        $scope.filteredFriends = $filter('startFrom')(
          $filter('limitTo')(
            $filter('friendsSearch')(
              $scope.friends, $scope.search),
              $scope.currentPage  * $scope.pageSize),
              $scope.pageSize);
              */
  }

    $scope.$watch("currentPage", function(page){
      console.log("currentPage:",$scope.currentPage)
      /*
      if(page)  {
        console.log("update filter");
        $scope.filterFriends();
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
      */
    })

  $scope.updateNumberOfPages = function(length){
    $scope.numberOfPages = Math.ceil($filter('friendsSearch')($scope.friends,$scope.search).length/ $scope.pageSize);
  }

  $scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
  }
  $scope.nextPage = function(){
    if($scope.pageSize && ($scope.pageSize > $scope.currentPage +1)) {
      console.log("Page suivante")
      $scope.currentPage ++;
    }
    //$scope.filterFriends();
    //$scope.$broadcast('scroll.refreshComplete');
    //$scope.$broadcast('scroll.scrollTop');
  }
  $scope.previousPage = function(){
    if($scope.currentPage > 0)  $scope.currentPage --;
    //$scope.filterFriends();
    //$scope.$broadcast('scroll.refreshComplete');
    //$scope.$broadcast('scroll.scrollTop');
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
  }

  $scope.getSelectedFriend = function(){
    return $filter('filter')($scope.friends,{enabled:true});
  }

  $scope.sendFriendsInvitation = function(message){
    UserService.sendFriendsInvitation($scope.getSelectedFriend(),message);
  }


  /* WATCHERS */
  $scope.$watch(UserService.friends, function(friends){
    console.log("watch friends")
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
