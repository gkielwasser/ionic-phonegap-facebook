(function (window, document) {

  function onWindowLoad() {
    if (window.cordova){
      console.log("we are on mobile")
      // on device add ready listener
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      console.log("we are on browser")
      // on browser trigger onDeviceReady
      onDeviceReady();
    }
    window.removeEventListener('load', onWindowLoad, false);
  }
  window.addEventListener('load', onWindowLoad, false);

  function onDeviceReady() {
    function checkConnection() {
      console.log(navigator.connection);
      if(navigator.connection==undefined) {
        window.localStorage.setItem("internetAccessFlag","false");
      } else {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
          window.localStorage.setItem("internetAccessFlag","false");
        } else {
          window.localStorage.setItem("internetAccessFlag","true");
        }
        //alert(window.localStorage.getItem("internetAccessFlag"));
      }
    }

    function bootstrapApplication(removeListeners){
      angular.bootstrap(document, ['starter']);

      if(removeListeners){
        document.removeEventListener('online',false);
        document.removeEventListener('resume',false);
      }
    }

    if(!window.cordova){
      console.log("brower check")
      if(navigator.onLine){
        window.localStorage.setItem("internetAccessFlag","true");
      }
      else{
        window.localStorage.setItem("internetAccessFlag","false");
      }
    }
    else{
      console.log("mobile check")
      checkConnection();
    }
    if(true){
    //if(window.localStorage.getItem("internetAccessFlag") == "true"){
      // bootstrap app
      angular.element(document).ready(function () {
        console.log("ANGULAR WILL BOOTSTRAP")
        bootstrapApplication();
      });
    }
    else{
      alert("Vous devez être connecté à Internet");
      document.addEventListener("resume", function() {
        console.log("ONLINE")
        bootstrapApplication();
      }, false);
      document.addEventListener("online", function() {
          console.log("ONLINE")
          bootstrapApplication();
      }, false);
    }

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
      angular.extend(application_conf.general,application_conf_mobile.general);
    }
    else{
      angular.extend(application_conf.facebook,application_conf_web.facebook);
      angular.extend(application_conf.general,application_conf_web.general);
    }

}])

  .config(['$stateProvider', '$urlRouterProvider','FacebookProvider','application_conf_web','application_conf_mobile',
    function($stateProvider, $urlRouterProvider,FacebookProvider,application_conf_web,application_conf_mobile) {

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




    if (cordova ) {
      console.log("CORDOVA ENABLED");
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


