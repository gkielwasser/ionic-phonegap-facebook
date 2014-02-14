angular.module('starter', ['ionic', 'ngTouch', 'starter.services', 'starter.controllers','starter.directives','facebook','checklist-model'])

  .run(["$rootScope","$state","$urlRouter",function($rootScope,$state,$urlRouter) {
    //Start Fastclick
    FastClick.attach(document.body);

  $rootScope.$on('$locationChangeSuccess', function(evt) {
    // Halt state change from even starting
    evt.preventDefault();

    // Perform custom logic
    var meetsRequirement;

    if(window.localStorage['didTutorial'] === "true") {
      console.log('Skip intro');
      meetsRequirement = true;
    }
    else{
      console.log('Do intro');
      meetsRequirement = false;
    }

    // Continue with the update and state transition if logic allows
    if (meetsRequirement) $urlRouter.sync();
    else $state.go('menu.intro');
  });


}])

  .config(['$stateProvider', '$urlRouterProvider','FacebookProvider',function($stateProvider, $urlRouterProvider,FacebookProvider) {

    $stateProvider
/*
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "views/tabs.html"
      })

      // the pet tab has its own child nav-view and history
      .state('tab.pet-index', {
        url: '/pets',
        views: {
          'pets-tab': {
            templateUrl: 'views/pet-index.html',
            controller: 'PetIndexCtrl'
          }
        }
      })

      .state('tab.pet-detail', {
        url: '/pet/:petId',
        views: {
          'pets-tab': {
            templateUrl: 'views/pet-detail.html',
            controller: 'PetDetailCtrl'
          }
        }
      })

      .state('tab.adopt', {
        url: '/adopt',
        views: {
          'adopt-tab': {
            templateUrl: 'views/adopt.html'
          }
        }
      })

      .state('tab.swipe', {
        url: '/swipe',
        views: {
          'swipe-tab': {
            templateUrl: 'views/swipe.html'
          }
        }
      })
*/
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
    FacebookProvider.init('711009162272801');

  }]).filter('startFrom', function() {
    return function(input, start) {
      return (input) ? input.slice(start) : false;
    };
  });


