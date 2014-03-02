'use strict';
angular.module('starter.services', [])


  .service('PaceService',['$window', function($window){
    return{
      start: function(){
        console.log("pace")
        $window.Pace.start();
        Pace.start();
      }
    }
  }])