angular.module('starter.services', [])


  .service('ConnectService',['$ionicLoading','$window', function($ionicLoading,$window){
    var disconnection;
    var showDisconnection = function() {

      // Show the loading overlay and text
        disconnection = $ionicLoading.show({

        // The text to display in the loading indicator
        content: '<i class=" ion-alert-circled"></i> Une connexion Internet est nécessaire',

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
    var hideDisconnection = function(){
      if(disconnection)disconnection.hide();
    };

    var online = function(){
      console.log("Status online")
      hideDisconnection();
    }

    var offline= function(){
      console.log("Status offline")
      showDisconnection();
    }



    var onlineStatus = {};

    onlineStatus.onLine = $window.navigator.onLine;
    if( $window.navigator.onLine){
      online()
    } else{
      offline();
    }


    onlineStatus.isOnline = function() {
      return onlineStatus.onLine;
    }

    $window.addEventListener("online", function () {
      onlineStatus.onLine = true;
      online();
      $rootScope.$digest();
    }, true);

    $window.addEventListener("offline", function () {
      onlineStatus.onLine = false;
      offline();
      $rootScope.$digest();
    }, true);

    return {
      offline:function(){
        offline();
      },
      online:function(){
       online();
      }
    };
  }])



.factory('UserService', ['$rootScope','Facebook','$q', 'application_conf', '$filter',function($rootScope,Facebook,$q,application_conf,$filter) {
    var initiated = false;

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
    console.log("Facebook:login",data);
    if (data.status == 'connected' && !initFB) {
      console.log('Connexion de',data)
      init();
     // initFB = true;
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
    if(data.status == 'connected') {
      $rootScope.$apply(function() {
        user.logged = true;
      });
    }
    else {
      $rootScope.$apply(function() {
        user.logged = false;
      });
    }
  })

    $rootScope.$on('Facebook:load', function(e,data){
      //console.log("Facebook:load",data);
    })

  var init = function(force){
   if(!force && !initiated){
     $rootScope.showLoading();
      var defered = $q.defer();
      me();
      friends().then(function(){
        defered.resolve();
        $rootScope.hideLoading();
      });

     initiated = true;
      return defered.promise;
   }
  }

  var reset = function(){
    user = {};
    initFB = false;
  }

  var friends = function() {
    var defered = $q.defer();
    Facebook.api('/me/friends?fields=' + application_conf.facebook.friends_fields, function(response) {
      $rootScope.$apply(function() {
        user.friends = response.data;
        console.log("friends",user.friends)
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
    console.log("try login")
    var defered = $q.defer();
    Facebook.login(function(response) {
      console.log(response)
      console.log("success login...",response)
      init();
      defered.resolve();
    },{scope: application_conf.facebook.permissions});
    return defered.promise;
  }

  var getLoginStatus = function() {
    var defered = $q.defer();
    Facebook.getLoginStatus(function(response) {
      if(response.status == 'connected') {
        $rootScope.$apply(function() {
          $rootScope.loggedIn = true;
          user.logged = true;
          defered.resolve("connected");
        });
      }
      else {
        $rootScope.$apply(function() {
          $rootScope.loggedIn = false;
          user.logged = false;
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
      return (user.logged) ? user : false;
    },
    user: function(){
      return user;
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
    subscribedFriends: function(){
      return user.subscribedFriends;
    },
    logout: function(){
      console.log("logout")
      return Facebook.logout(function() {});
    },

    sendFriendsInvitation: function(selectedFriends,message){
      var nonInvitedId = [];
      angular.forEach($filter('filter')(selectedFriends), function (value){
        console.log("ITEM",value)
        nonInvitedId.push(value.id);
      })
    console.log("Try send Invitations to", nonInvitedId)
        FB.ui({
          method: 'apprequests',
          to:nonInvitedId ,
          message: message || "Voilà une super application pour ..."
        }, function(response) {
          console.log('sendRequestInvite UI response: ', response);
        });

    }
  }
}]);
