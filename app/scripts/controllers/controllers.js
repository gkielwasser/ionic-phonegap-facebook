angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
  // 'Pets' is a service returning mock data (services.js)
  $scope.pets = PetService.all();
})


// A simple controller that shows a tapped item's data
.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
  // 'Pets' is a service returning mock data (services.js)
  $scope.pet = PetService.get($stateParams.petId);
})

  .controller('IntroCtrl', function($scope, $state) {

    // Called to navigate to the main app
    var startApp = function() {
      $state.go('menu.about');

      // Set a flag that we finished the tutorial
      window.localStorage['didTutorial'] = true;
    };

    //No this is silly
    // Check if the user already did the tutorial and skip it if so
    if(window.localStorage['didTutorial'] === 'true') {
     console.log('Skip intro');
     startApp();
     }

    // Move to the next slide
    $scope.next = function() {
      $scope.$broadcast('slideBox.nextSlide');
    };

    // Our initial right buttons
    var rightButtons = [
      {
        content: 'Suivant',
        type: 'button-positive ion ',
        tap: function(e) {
          // Go to the next slide on tap
          $scope.next();
        }
      }
    ];

    // Our initial left buttons
    var leftButtons = [
      {
        content: 'Passer',
        type: 'button-positive',
        tap: function(e) {
          // Start the app on tap
          startApp();
        }
      }
    ];

    // Bind the left and right buttons to the scope
    $scope.leftButtons = leftButtons;
    $scope.rightButtons = rightButtons;


    // Called each time the slide changes
    $scope.slideChanged = function(index) {

      // Check if we should update the left buttons
      if(index > 0) {
        // If this is not the first slide, give it a back button
        $scope.leftButtons = [
          {
            content: 'Précédent',
            type: 'button-positive',
            tap: function(e) {
              // Move to the previous slide
              $scope.$broadcast('slideBox.prevSlide');
            }
          }
        ];
      } else {
        // This is the first slide, use the default left buttons
        $scope.leftButtons = leftButtons;
      }

      // If this is the last slide, set the right button to
      // move to the app
      if(index == 2) {
        $scope.rightButtons = [
          {
            content: 'Commencer',
            type: 'button-positive',
            tap: function(e) {
              startApp();
            }
          }
        ];
      } else {
        // Otherwise, use the default buttons
        $scope.rightButtons = rightButtons;
      }
    };
  })
  .controller('ModalCtrl', ['$scope','$ionicModal',function($scope, $ionicModal) {

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('views/friendsConfirmationModal.html', function(modal) {
      $scope.modal = modal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });

    // Test data
    $scope.contacts = [
      { name: 'Gordon Freeman' },
      { name: 'Barney Calhoun' },
      { name: 'Lamarr the Headcrab' }
    ];

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
  }])

  .controller('FriendsCtrl', ['$scope','UserService','$timeout','$q','$filter',function($scope,UserService,$timeout,$q,$filter) {


    /*Fin*/

    $scope.$watch(UserService.friends, function(friends){
      if(friends){
        console.log('friends!',friends)
        $scope.initFriendsCtrl(friends);

      }
    })

    $scope.initFriendsCtrl = function(friends){
      $scope.initFriendsPartial(friends);
    }


    $scope.initFriendsPartial = function(friends){
      $scope.friends = friends;
      // Pagination in controller
      $scope.currentPage = 0;
      $scope.pageSize = 15;

      $scope.numberOfPages = function() {
        return Math.ceil($filter('filter')($scope.friends,$scope.search).length/ $scope.pageSize);
      };
    }

    $scope.setCurrentPage = function(currentPage) {
      $scope.currentPage = currentPage;
    }
    $scope.nextPage = function(){
      $scope.currentPage ++;
    }
    $scope.previousPage = function(){
      $scope.currentPage --;
    }

    $scope.getNumberAsArray = function (num) {
      return new Array(num);
    };





    $scope.selectedFriends = [];
    $scope.addFriend=function(friend,event){
      if(event.target.className[0] != 'n'){
        if($scope.selectedFriends.indexOf(friend) == -1){
          $scope.selectedFriends.push(friend);
        }
        else  {
          $scope.selectedFriends.splice($scope.selectedFriends.indexOf(friend),1);
        }
      }
    }

    $scope.addItems = function () {
      for (var i = 0; i < 10; i++) {
        $scope.friends.push();

        if ($scope.friends.length >= $scope.maxItems) {
          $scope.canLoad = false;
          return;
        }
      }
    };




  }])

  .controller('leftMenuCtrl', ['$scope','UserService','$state','Facebook',function($scope,UserService,$state,Facebook) {
    // CloseMenu
    $scope.closeMenu = function(st) {
      $scope.sideMenuController.close();
      $state.go(st);
    };

    $scope.logout = function() {
      UserService.logout(function() {
        $state.go('login');
      });
    }
    $scope.login = function() {
      Facebook.login(function(response) {
        // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
        console.log('response fb',response)
      });
    };
  }])

  .controller('MainCtrl', ['$scope','$state','Facebook','UserService',function($scope, $state,Facebook,UserService) {



    $scope.$watch(UserService.logged, function(data){
      console.log('logged cahnge',data)
      $scope.user = data;
    })


    // Here, usually you should watch for when Facebook is ready and loaded
    $scope.$watch(function() {
      return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
    }, function(newVal) {
      $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
    });

    $scope.$on('Facebook:load', function(e,data){
      console.log('Facebook:load',data);
    })

    $scope.toIntro = function(){
      window.localStorage['didTutorial'] = 'false';
      $state.go('menu.intro');
    }
  }])

  .controller('LoginCtrl', ['$scope','UserService','Facebook', function($scope,UserService,Facebook) {
    $scope.user = UserService;
    $scope.login = function() {
      Facebook.login(function(response) {
        // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
        console.log('response fb',response)
      });
    };

    $scope.logout = function() {
      Facebook.logout(function() {});
    }
}]);


