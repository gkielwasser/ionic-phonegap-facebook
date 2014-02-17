angular.module('starter.services', [])

.factory('UserService', ['$rootScope','Facebook','$ionicLoading','$q', function($rootScope,Facebook,$ionicLoading,$q) {

    /*début loading*/
    // Trigger the loading indicator
    $rootScope.showLoading = function() {

      // Show the loading overlay and text
      $rootScope.loading = $ionicLoading.show({

        // The text to display in the loading indicator
        content: '<i class=" ion-loading-c"></i> Chargement',

        // The animation to use
        animation: 'fade-in',

        // Will a dark overlay or backdrop cover the entire view
        showBackdrop: true,

        // The maximum width of the loading indicator
        // Text will be wrapped if longer than maxWidth
        maxWidth: 200,

        // The delay in showing the indicator
        showDelay: 0
      });
    };

    // Hide the loading indicator
    $rootScope.hideLoading = function(){
      $rootScope.loading.hide();
    };


    // Here, usually you should watch for when Facebook is ready and loaded
    $rootScope.$watch(function() {
      return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
      $rootScope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    });

  var user = {};
  var initFB = false;
  $rootScope.$on('Facebook:login', function(e,data){
    $rootScope.$apply(function() {
    //console.log("Facebook:login",data);
    if (data.status == 'connected' && !initFB) {
      console.log('Connexion de',data)
      init();
      initFB = true;
    }
    else{
      reset();
    }
    })
  })
  $rootScope.$on('Facebook:logout', function(e,data){
    $rootScope.$apply(function() {
    console.log("Facebook:logout",data);
    reset();
    })
  })
    $rootScope.$on('Facebook:prompt', function(e,data){
      console.log("Facebook:prompt",data);
    })
  $rootScope.$on('Facebook:sessionChange', function(e,data){
    console.log("Facebook:sessionChange",data);
  })
  $rootScope.$on('Facebook:statusChange', function(e,data){
    if (data.status == 'connected') {
      //init();
    }
    else{
      reset();
    }
  })
  $rootScope.$on('Facebook:authResponseChange', function(e,data){
    //console.log("Facebook:authResponseChange",data);
  })

  var init = function(){
   $rootScope.showLoading();
    var defered = $q.defer();
    me();
    friends().then(function(){
      defered.resolve();
      $rootScope.hideLoading();
    });
    return defered.promise;
  }

  var reset = function(){
    user = {};
    initFB = false;
  }

  var friends = function() {
    var defered = $q.defer();
    Facebook.api('/me/friends?fields=name,first_name,picture', function(response) {
      $rootScope.$apply(function() {
        user.friends = response.data;
        defered.resolve();
      });
    });
    return defered.promise;
  };

  var me = function() {
    Facebook.api('/me', function(response) {
      $rootScope.$apply(function() {
        user.me = response;
      });
    });
  };

  var login = function(){
    var defered = $q.defer();
    Facebook.login(function(response) {
      defered.resolve();
    });
    return defered.promise;
  }

  var getLoginStatus = function() {
    var defered = $q.defer();
    Facebook.getLoginStatus(function(response) {
      if(response.status == 'connected') {
        $rootScope.$apply(function() {
          $rootScope.loggedIn = true;
          defered.resolve("connected");
        });
      }
      else {
        $rootScope.$apply(function() {
          $rootScope.loggedIn = false;
          defered.resolve();
        });
      }
    })
    return defered.promise;
  }

  return {
    getLoginStatus: function(){
      return getLoginStatus();
    },
    logged: function(){
      return (user.me) ? user.me : false;
    },
    login: function(){
      return login();
    },
    profile: function() {
      return user.profile;
    },
    friends: function() {
      return user.friends;
    },
    logout: function(){
      console.log("logout")
      return Facebook.logout(function() {});
    }
  }
}]);
