'use strict'

angular.module('starter.services')

.service('ConnectService',['$ionicLoading','$window', "$rootScope",function($ionicLoading,$window,$rootScope){
  var disconnection;
  var showDisconnection = function() {

    // Show the loading overlay and text
    disconnection = $ionicLoading.show({

      // The text to display in the loading indicator
      content: '<i class=" ion-alert-circled"></i> Une connexion Internet est nécessaire',

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
  var hideDisconnection = function(){
    if(disconnection)disconnection.hide();
  };

  var online = function(){
    console.log("Status online")
    hideDisconnection();
  }

  var offline= function(){
    console.log("Status offline")
    showDisconnection();
  }



  var onlineStatus = {};

  onlineStatus.onLine = $window.navigator.onLine;
  if( $window.navigator.onLine){
    online()
  } else{
    offline();
  }


  onlineStatus.isOnline = function() {
    return onlineStatus.onLine;
  }

  $window.addEventListener("online", function () {
    onlineStatus.onLine = true;
    online();
    $rootScope.$digest();
  }, true);

  $window.addEventListener("offline", function () {
    onlineStatus.onLine = false;
    offline();
    $rootScope.$digest();
  }, true);

  return {
    offline:function(){
      offline();
    },
    online:function(){
      online();
    }
  };
}])