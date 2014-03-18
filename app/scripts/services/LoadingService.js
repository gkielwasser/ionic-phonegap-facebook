'use strict'

angular.module('starter.services')

  .service('LoadingService', ["$ionicLoading", function($ionicLoading){
    var loading;
    return{
      hideLoading : function(){
       loading.hide();
      },
      showLoading : function(message){
        console.log("SHOW FROM SERVICE")
        message = message || "Chargement";

        // Show the loading overlay and text
        loading = $ionicLoading.show({

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
          showDelay: 500
        });
      }
    }

  }])