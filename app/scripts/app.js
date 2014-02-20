(function (window, document) {

  function onWindowLoad() {
    if (!(!window.cordova && !window.PhoneGap && !window.phonegap)) {
      // on device add ready listener
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      // on browser trigger onDeviceReady
      onDeviceReady();
    }
    window.removeEventListener('load', onWindowLoad, false);
  }
  window.addEventListener('load', onWindowLoad, false);

  function onDeviceReady() {
    // bootstrap app
    angular.element(document).ready(function () {
      angular.bootstrap(document, ['starter']);
    });
    document.removeEventListener('deviceready', onDeviceReady, false);
  }
})(window, document);

angular.module('starter', ['ionic', 'ngTouch', 'starter.services', 'starter.controllers','starter.directives','facebook','checklist-model'])

  .run(["$rootScope","$state","$urlRouter",function($rootScope,$state,$urlRouter) {
    //Start Fastclick
    FastClick.attach(document.body);


  $rootScope.$on('$stateChangeSuccess', function(evt,toSate) {

    // Halt state change from even starting
    evt.preventDefault();

    // Perform custom logic
    var meetsRequirement;

    if(window.localStorage['didTutorial'] === "true") {
      console.log('Skip intro',toSate);
      meetsRequirement = true;
      $rootScope.enableSideMenu = true;
    }
    else{
      console.log('Do intro',toSate);
      meetsRequirement = false;
      $rootScope.enableSideMenu = false;
    }

    // Continue with the update and state transition if logic allows
    if (meetsRequirement) $urlRouter.sync();
    else $state.go('menu.intro');
  });


}])

  .config(['$stateProvider', '$urlRouterProvider','FacebookProvider',function($stateProvider, $urlRouterProvider,FacebookProvider) {

    $stateProvider

      .state('menu', {
        url: "",
        abstract: true,
        templateUrl: "views/menu.html"
      })

      .state('menu.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'views/friends.html',
            controller: 'FriendsCtrl'
          }
        }
      })

      .state('menu.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'views/about.html'
          }
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .state('menu.intro', {
        url: '/intro',
        views: {
          'menuContent': {
            templateUrl: 'views/intro.html',
            controller: 'IntroCtrl'
          }
        }
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/about');

    // Here you could set your appId throug the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
    //  FacebookProvider.init('711009162272801');
    var config = {
      appId: '711009162272801',
      'oauth': true,
      'localSDK': 'facebook-js-sdk.js'
    }
   FacebookProvider.init(config, false);

  }]).filter('startFrom', function() {
    return function(input, start) {
      return (input) ? input.slice(start) : false;
    };
  });


