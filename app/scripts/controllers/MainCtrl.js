'use strict';

angular.module('starter')
.controller('MainCtrl', ['$scope','UserService','application_conf','$rootScope','LoadingService',
  function($scope,UserService,application_conf,$rootScope,LoadingService) {
    //Chargement du statut de l'utilsiateur
    LoadingService.showLoading();

    var digests = 0;
    $scope.$watch(function() {
      digests++;
      //console.log(digests + " calls");
    });


    $scope.application_conf = application_conf;
    console.log("CONFIGURATION",application_conf)

    $scope.leftButtons = [{
      type: 'button-clear',
      content: '<i class="icon ion-navicon">',
      tap: function (e) {
        $scope.$broadcast('toggleSideMenu');
      }
    }];

    $scope.closeMenu = function(){
      $scope.$broadcast('closeSideMenu');
    }

    $scope.$watch(UserService.initiated, function(initiated){
      if(initiated){
        LoadingService.hideLoading();
      }
    })
    $scope.$watch(UserService.user, function(data){
      console.log("user change",data)
      $scope.user = data;
    },true)

    $scope.user = UserService.user;
    // Show the loading indicator

    $scope.cl=function(){

    }


  }]);
