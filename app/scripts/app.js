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
      console.log("ANGULAR WILL BOOTSTRAP")
      angular.bootstrap(document, ['starter']);
    });
    document.removeEventListener('deviceready', onDeviceReady, false);
  }
})(window, document);


angular.module('starter', ['ionic', 'ngTouch', 'starter.services', 'starter.controllers','starter.directives','facebook','checklist-model'])

  .run(["$rootScope","$state","$urlRouter","application_conf","application_conf_web","application_conf_mobile",
    function($rootScope,$state,$urlRouter,application_conf,application_conf_web,application_conf_mobile) {

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


    if (cordova ) {
      angular.extend(application_conf.facebook,application_conf_mobile.facebook);
      angular.extend(application_conf,application_conf_mobile);
     // application_conf = application_conf_mobile;
     // application_conf.facebook.init = application_conf_mobile.init;
    }
    else{
      angular.extend(application_conf.facebook,application_conf_web.facebook);
      angular.extend(application_conf.general,application_conf_web.general);
    }

}])

  .config(['$stateProvider', '$urlRouterProvider','FacebookProvider','application_conf_web','application_conf_mobile',function($stateProvider, $urlRouterProvider,FacebookProvider,application_conf_web,application_conf_mobile) {

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

      .state('menu.subscribedFriends', {
        url: '/subscribedFriends',
        views: {
          'menuContent': {
            templateUrl: 'views/subscribedFriends.html',
            controller: 'SubscribedFriendsCtrl'
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

    if (cordova ) {
      console.log("CORDOVA ENABLED",application_conf.facebook.init);
      FacebookProvider.init(application_conf_mobile.facebook.init,false);
      /*
      document.addEventListener('deviceready', function () {
        FB.init({
          appId: FBAPPID,                 // App ID from the app dashboard
          channelUrl: '//localhost/channel.html',        // Channel file for x-domain comms
          nativeInterface: CDV.FB,
          status: true,
          frictionlessRequests: true,
          useCachedDialogs: false
        });
      }, false);
      */
    } else {
      console.log("CORDOVA DISABLED",application_conf_web.facebook.init)
      FacebookProvider.init(application_conf_web.facebook.init);

      /*
      window.fbAsyncInit = function() {
        FB.init({
          appId: FBAPPID,                        // App ID from the app dashboard
          channelUrl: 'http://localhost/channel.html', // Channel file for x-domain comms
          status: true,                                 // Check Facebook Login status
          frictionlessRequests: true,
          useCachedDialogs: false
        });
      };

      // Load the SDK asynchronously
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      */
    }
  }]).filter('startFrom', function() {
    return function(input, start) {
      return (input) ? input.slice(start) : false;
    };
  });


