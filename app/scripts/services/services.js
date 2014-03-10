'use strict';
angular.module('starter.services', [])


  .service('PaceService',['$window', function($window){

    $window.Pace.on('start', function(){
      console.log("Pace start")
    })
    $window.Pace.on('hide', function(){
      console.log("Pace hidden")

    })

    return{
      start: function(){
        console.log("pace")
        $window.Pace.start();
        Pace.start();
      }
    }
  }])