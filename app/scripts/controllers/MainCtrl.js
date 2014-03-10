'use strict';

angular.module('starter')
.controller('MainCtrl', ['$scope','UserService','application_conf','$rootScope','$ionicLoading',
  function($scope,UserService,application_conf,$rootScope,$ionicLoading) {
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

    $scope.$watch(UserService.user, function(data){
      console.log("user change",data)
      $scope.user = data;
    },true)

    $scope.user = UserService.user;
    // Show the loading indicator
    $rootScope.showLoading = function(message) {
      message = message || "Chargement";

      // Show the loading overlay and text
      $rootScope.loading = $ionicLoading.show({

        // The text to display in the loading indicator
        content: '<i class=" ion-loading-c"></i> '+ message,

        // The animation to use
        animation: 'fade-in',

        // Will a dark overlay or backdrop cover the entire view
        showBackdrop: true,

        // The maximum width of the loading indicator
        // Text will be wrapped if longer than maxWidth
        maxWidth: 200,

        // The delay in showing the indicator
        showDelay: 0
      });
    };

    // Hide the loading indicator
    $rootScope.hideLoading = function(){
      $rootScope.loading.hide();
    };

  }]);
