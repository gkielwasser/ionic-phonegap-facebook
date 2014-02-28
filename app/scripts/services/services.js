angular.module('starter.services', [])


  .service('ConnectService',['$ionicLoading','$window', "$rootScope",function($ionicLoading,$window,$rootScope){
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
    /*
    $rootScope.$apply(function() {
    console.log("Facebook:login",data);
    if (data.status == 'connected' && !initFB) {
      console.log('Connexion de',data)
      //init("Facebook:login");
    }
    else{
      reset();
    }
    })
    */
  })
  $rootScope.$on('Facebook:logout', function(e,data){
    /*
    $rootScope.$apply(function() {
    console.log("Facebook:logout");
    reset();
    })
    */
  })
  $rootScope.$on('Facebook:prompt', function(e,data){
      console.log("Facebook:prompt");
    })
  $rootScope.$on('Facebook:sessionChange', function(e,data){
    //console.log("Facebook:sessionChange");
  })
  $rootScope.$on('Facebook:statusChange', function(e,data){
    handleStatusChange(data,"statusChange");
    /*
    console.log("!!!!!statusChange")
    if (data.status == 'connected') {
      init("statuschange");
    }
    else{
      reset();
    }
    */
  })



  $rootScope.$on('Facebook:authResponseChange', function(e,data){
    console.log("Facebook:authResponseChange");
    //handleStatusChange(data,"authResponseChange");
    /*
    if(data.status == 'connected') {
      $rootScope.$apply(function() {
        user.logged = true;
        init();
      });
    }
    else {
      $rootScope.$apply(function() {
        user.logged = false;
      });
    }
    */
  })

  var init = function(location,force){
   if(!force && !initiated){
     console.log("*********INIT**********", initiated, location)
     var defered = $q.defer();
     $rootScope.showLoading();
     var promises = [];

     promises.push(me());
     promises.push(friends());

     function lastTask(){
       $rootScope.hideLoading();
       user.logged = true;
       initiated = true;
       defered.resolve()
     }

     $q.all(promises).then(lastTask);

     return defered;
   }
    else{
     console.log("*********IGNORE INIT**********")
   }
  }

  var handleResponse = function(response){
    if (!response.error) {
      console.log("The user is connected")
      $rootScope.$apply(function() {
        user.me = response;
      });
    } else {
      console.log("The user is NOT connected (1)")
      console.log('Error getting user info: ' + JSON.stringify(response.error));
      // Check for errors due to app being unininstalled
      if (response.error.error_subcode && response.error.error_subcode == "458") {
        setTimeout(function() {
          alert("The app was removed. Please log in again.");
        }, 0);
      }
      logout();
    }

    reset();
  }

  var handleStatusChange = function(session,from){
    console.log(from)
    console.log('Got the user\'s session: ' + JSON.stringify(session));

    if (session.authResponse && session.authResponse.accessToken) {
      console.log('Got the user\'s session: ' + JSON.stringify(session.authResponse.accessToken));
      init(from);
    }
    else  {
      console.log("The user is NOT connected (2)")
      reset();
    }
  }

  var reset = function(){
    user = {};
    initFB = false;
    user.logged = false;
    initiated = false;
  }

  var logout = function(){
    return Facebook.logout(function() {});
  }

  var friends = function() {
    console.log("FB:ask friends")
    var defered = $q.defer();
    Facebook.api('/me/friends?fields=' + application_conf.facebook.friends_fields, function(response) {
      console.log("FB:get friends:" + JSON.stringify(response))
      if (!response.error) {
        console.log(response)
        $rootScope.$apply(function() {
          user.friends = response.data;
          defered.resolve();
        });
      }
      else{
        console.log("error:" + JSON.stringify(response.error))
      }
    });
    return defered.promise;
  };

  var me = function() {
    console.log("FB:ask me")
    Facebook.api('/me?fields=' + application_conf.facebook.me_fields, function(response) {
      console.log("FB:get me",JSON.stringify(response))
      if (!response.error) {
        $rootScope.$apply(function() {
          user.me = response;
        });
      }
      else{
        console.log("error",JSON.stringify(response.error))
      }
    });
  };

  var login = function(){
    console.log("try login")
    $rootScope.showLoading("Connexion Facebook");
    var defered = $q.defer();
    Facebook.login(function(response) {
      console.log(response)
      if(response.authResponse && response.status == "connected"){
        console.log("success login...",response)
        //init("login");
      }
      else{
        console.log("Echec login");
      }

      $rootScope.hideLoading();

      defered.resolve();
    },{scope: application_conf.facebook.permissions});
    return defered.promise;
  }

  var getLoginStatus = function() {
    console.log("getloginstatus")
    var defered = $q.defer();
    Facebook.getLoginStatus(function(response) {
      handleStatusChange(response, "getLoginStatus")
    })
    return defered.promise;

  }

  getLoginStatus();

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
      return logout();
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
