'use strict';

angular.module('starter')

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

      .state('menu.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
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
    $urlRouterProvider.otherwise('/home');




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
  }])