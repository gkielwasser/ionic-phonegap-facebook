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
}]).directive('connectivity', ["$window","$parse", function($window, $parse) {
  return function($scope, element, $attrs) {

    //Parse attribute value into JSON
    var events = $scope.$eval($attrs.connectivity);

    //Loop through events in JSON object
    angular.forEach(events,function (connEvent, eventName){
    console.log("loop",eventName);
      //Parse event
      fn = $parse(connEvent)

      //Attach events to listeners
      switch (eventName){
        case 'connect':
          $scope.connect = fn;
          $window.addEventListener("online", function(){
            console.log('Detect Online Event')
            $scope.$apply(function(){
              fn($scope)
            })
          },false);
          break;
        case 'disconnect':
          $scope.disconnect = fn;
          $window.addEventListener("offline", function(){
            console.log('Detect Offline Event')
            $scope.$apply(function(){
              fn($scope)
            })
          },false);

       }
    })

    //Run it once onload
    if(navigator.onLine){
      console.log("connect")
      $scope.connect($scope);
    }
    else{
      console.log("disconnect")
      $scope.disconnect($scope);
    }
    }
}])




  .directive('postRepeatDirective',
    ['$timeout',
      function($timeout) {
        return function(scope) {
          if (scope.$first)
            window.a = new Date();   // window.a can be updated anywhere if to reset counter at some action if ng-repeat is not getting started from $first
          if (scope.$last)
            $timeout(function(){
              console.log("## DOM rendering list took: " + (new Date() - window.a) + " ms");
            });
        };
      }
    ]);


