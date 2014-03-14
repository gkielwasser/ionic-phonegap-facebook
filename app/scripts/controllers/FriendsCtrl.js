'use strict';

angular.module('starter.controllers')

.controller('FriendsCtrl', ['$scope','UserService','$filter','$timeout','application_conf',function($scope,UserService,$filter,$timeout,application_conf) {
    $scope.initiated = false;
    $scope.pageSize = 15;
    $scope.filter = {
      value: "",
      limit: application_conf.general.scroll.items_preloaded
    }


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
    console.log("INIT FRIENDS PARTIAL")
    /*Performance: travailler sur une copie locale du tableau : on ne veut pas travailler directement sur l'objet user.friends*/
    $scope.friends = angular.copy(friends);
    //$scope.friends = friends;
    $scope.down = false;
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

    $scope.loadMore = function() {
      console.log("loadmore")
      $scope.nextPage();
    };

  $scope.checkMoreScroll = function(){
    console.log($scope.filteredFriends,$scope.virtualFriends)
    if($scope.filteredFriends && ($scope.virtualFriends.length == $scope.filteredFriends.length)){
      console.log("No more scroll!!!");
      $scope.noMoreScroll = true;
    }
    else{
      console.log("Content to scroll !!!")
      $scope.noMoreScroll = false;
    }
  }

    $scope.resetSearch = function(){
      $scope.filter.value ='';
      $scope.filter.limit = application_conf.general.scroll.items_preloaded;
      $scope.searching();
    }

  $scope.filterFriends = function(type){
    console.log("**FILTER**",type)
    if(type === "bySearch"){
      $scope.filteredFriends =  $filter('friendsSearch')($scope.friends,$scope.filter.value);
      $scope.virtualFriends = $filter('limitTo')($scope.filteredFriends,($scope.filter.limit) );
    }
    else if(type === "byLimit"){
      $scope.virtualFriends = $filter('limitTo')($scope.filteredFriends,($scope.filter.limit) );
    }
    else{
      $scope.filteredFriends =  $filter('friendsSearch')($scope.friends,$scope.filter.value);
      $scope.virtualFriends = $filter('limitTo')($scope.filteredFriends,($scope.filter.limit) );
    }
    $scope.checkMoreScroll();

    $scope.$broadcast('scroll.infiniteScrollComplete');
    /*
        $scope.virtualFriends = $filter('startFrom')(
          $filter('limitTo')(
            $filter('friendsSearch')(
              $scope.friends, $scope.filter.value),
              $scope.currentPage  * $scope.pageSize),
              $scope.pageSize);
              */
  }

  $scope.$watch("filter.limit", function(limit){
    console.log("limit:",limit,$scope);
    if(limit)  {
      $scope.filterFriends("byLimit");
    }
    else{
      console.log("no limit")
    }
  })

    $scope.$on('scroll-down', function(a,value){
      console.log("initiated",$scope.initiated,value)
      $timeout(function(){
        $scope.down = value;
      })
    })

  $scope.nextPage = function(){
    if($scope.friends && ($scope.friends.length > $scope.filter.limit)) {
      console.log("Page suivante")
      $scope.filter.limit += application_conf.general.scroll.items_to_load;
    }
    else{
      console.log("ignore")
    }
  }
  $scope.previousPage = function(){
    if($scope.filter.limit > application_conf.general.scroll.items_to_load)  $scope.filter.limit -= application_conf.general.scroll.items_to_load;
  }

  $scope.searching = function(){
    $scope.$broadcast('scroll.scrollTop');
    $scope.filter.limit = application_conf.general.scroll.items_preloaded;
    $scope.filterFriends("bySearch");
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
    console.log("watch friends");
    if(friends){
      $scope.initFriendsCtrl(friends);
    }
  })

  $scope.$watch("friends",function(value){
    if(value){
      $scope.filterFriends();
      //Masquer bouton Annuler
      if($scope.getSelectedFriend() && $scope.getSelectedFriend().length == 0){
        enableCancelButton(false);
      }
      else if (!$scope.rightButtons && $scope.getSelectedFriend() && $scope.getSelectedFriend().length > 0)  enableCancelButton(true);
    }
  },true)
}])
