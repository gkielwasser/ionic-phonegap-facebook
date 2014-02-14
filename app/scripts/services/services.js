angular.module('starter.services', [])

.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [
    { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
    { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
    { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
    { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 4, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 5, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 6, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 7, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 8, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 9, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 10, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 11, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 12, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' },
    { id: 13, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
  ];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
})

.factory('UserService', ['$rootScope','Facebook','$ionicLoading','$q', function($rootScope,Facebook,$ionicLoading,$q) {

    /*début loading*/
    // Trigger the loading indicator
    $rootScope.showLoading = function() {

      // Show the loading overlay and text
      $rootScope.loading = $ionicLoading.show({

        // The text to display in the loading indicator
        content: 'Chargement',

        // The animation to use
        animation: 'fade-in',

        // Will a dark overlay or backdrop cover the entire view
        showBackdrop: true,

        // The maximum width of the loading indicator
        // Text will be wrapped if longer than maxWidth
        maxWidth: 200,

        // The delay in showing the indicator
        showDelay: 1
      });
    };

    // Hide the loading indicator
    $rootScope.hideLoading = function(){
      $rootScope.loading.hide();
    };




  var user = {};

  $rootScope.$on('Facebook:login', function(e,data){
    $rootScope.$apply(function() {
    console.log("Facebook:login",data);
    if (data.status == 'connected') {
      init();
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
    console.log("Facebook:authResponseChange",data);
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
  }

  var friends = function() {
    var defered = $q.defer();
    Facebook.api('/me/friends?fields=name,first_name,picture', function(response) {
      $rootScope.$apply(function() {
        user.friends = response.data;
        console.log(response.data)
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

  return {
    logged: function(){
      return (user.me) ? user.me : false;
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
