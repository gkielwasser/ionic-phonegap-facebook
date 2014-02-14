angular.module('starter.directives', [])

 .directive('whenScrolled', ['$timeout', function($timeout) {
  return function(scope, elm, attr) {
    var raw = elm[0];
    var previousPosition;
    $timeout(function() {
      raw.scrollTop = raw.scrollHeight;
      console.log("init",raw)
    });

    elm.bind('scroll', function() {
      console.log(previousPosition,raw.scrollTop)
      if(previousPosition > raw.scrollTop){
        console.log("montée")
      }
      else{
        console.log("descente")
      }
      previousPosition = raw.scrollTop;
    });
  };
}])