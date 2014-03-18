angular.module('starter.directives', [])
  .directive('jauge', function(){
    return {
      scope:{
        max:"=",
        current:"="
      },
      restrict:"EA",
      templateUrl:"views/jaugeDirective.html",
      link: function(scope, elm, attr) {
        var update = function(){
          if(scope.current && scope.max)  scope.prc = scope.current/scope.max*100;
        }
        console.log("linking jauge.......")
        scope.$watch("max", function(){
          update();
        })
        scope.$watch("current",function(){
          update();
        })


      }
    }
  })
 .directive('whenScrolled', ['$timeout', function($timeout) {
  return function(scope, elm, attr) {
    var scrollCtrl = elm.controller('$ionicScroll');
    var infiniteScroll = elm.find('ion-infinite-scroll');
    var scrollView = scrollCtrl.scrollView;
    var lastPosition;
    /*
     var raw = elm[0];
    scrollCtrl.$element.on('scroll',function(){
      //console.log("scroll",scrollView.getValues().top)
    });


    $timeout(function() {
      raw.scrollTop = raw.scrollHeight;
      console.log("init",raw)
    });


    var infiniteStarted = false;
     */



    if(infiniteScroll) {
      /*
      // Parse infinite scroll distance
      var distance = attr.infiniteScrollDistance || '1%';
      var maxScroll;
      if(distance.indexOf('%')) {
        // It's a multiplier
        maxScroll = function() {
          return scrollView.getScrollMax().top * ( 1 - parseInt(distance, 10) / 100 );
        };
      } else {
        // It's a pixel value
        maxScroll = function() {
          return scrollView.getScrollMax().top - parseInt(distance, 10);
        };
      }
      */
      elm.bind('scroll', function(e) {
        if(lastPosition <scrollView.getValues().top ){
          scope.$emit("scroll-down",true);
        }
        else if(lastPosition >scrollView.getValues().top){
          scope.$emit("scroll-down",false);
        }

          //$scope.$apply(angular.bind($scope, $scope.onInfiniteScroll, cb));

        lastPosition = scrollView.getValues().top;
      });
    };
  }
}])

    .directive('connectivity', ["$window","$parse", function($window, $parse) {
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




  .directive('postRepeatDirective',['$timeout',
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
    ])



