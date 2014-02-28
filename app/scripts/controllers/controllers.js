angular.module('starter.controllers', [])

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
        content: '<i class="icon ion-chevron-right"></i>',
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
            content: '<i class="icon ion-chevron-left"></i>',
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
            content: 'J\'ai tout compris !',
            type: 'button-balanced button',
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
    $scope.$watch("getSelectedFriend()",function(value){
      if($scope.modal && value && value.length == 0){
        $scope.closeModal();
      }
    },true);

    // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('views/friendsConfirmationModal.html', function(modal) {
      $scope.modal = modal;
    }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  }])

  .controller('SubscribedFriendsCtrl', ['$scope','UserService','$filter', function($scope, UserService,$filter){


    $scope.initSubscribedFriends = function(){
      $scope.$watch(UserService.friends, function(friends){
        if(friends){
          $scope.friends = $filter('filter')(friends,{installed:true});
        }
      })
    }
  }])

  .controller('FriendsCtrl', ['$scope','UserService','$timeout','$q','$filter',function($scope,UserService,$timeout,$q,$filter) {
    var rightButtons = [
      {
        content: 'Annuler',
        tap: function(e) {
          $scope.reset();
        }
      }
    ];

    var enableCancelButton = function(enable){
      if(enable){
        $scope.rightButtons = rightButtons;
      }
      else{
        delete $scope.rightButtons;
      }
    }

    $scope.$watch(UserService.friends, function(friends){
      if(friends){
        $scope.initFriendsCtrl(friends);
      }
    })


    $scope.initFriendsCtrl = function(friends){
      $scope.initFriendsPartial(friends);
    }
    $scope.list = [];

    for (var i = 0; i < 1000; i++) {
      $scope.list.push({
        id: i,
        name: 'Name ' + i,
        detail: 'Detail ' + i
      });
    }

    //$scope.friends=[];
    $scope.initFriendsPartial = function(friends){
      $scope.friends = friends;
      // Pagination in controller
      $scope.currentPage = 0;
      $scope.pageSize = 15;

      $scope.numberOfPages = function() {
        return Math.ceil($filter('filter')($scope.friends,{name:$scope.search}).length/ $scope.pageSize);
      };
    }

    $scope.setCurrentPage = function(currentPage) {
      $scope.currentPage = currentPage;
    }
    $scope.nextPage = function(){
      $scope.currentPage ++;
      $scope.$broadcast('scroll.scrollTop');
    }
    $scope.previousPage = function(){
      $scope.currentPage --;
      $scope.$broadcast('scroll.scrollTop');
    }

    $scope.searching = function(){
      $scope.$broadcast('scroll.scrollTop');
      $scope.currentPage = 0
    }

    $scope.getNumberAsArray = function (num) {
      return new Array(num);
    };



    $scope.loadMore = function(done) {
      $timeout(function() {
        //$scope.movies.push({});
        console.log("loadmore")
        done();
      }, 500);
    }

    $scope.$watch("friends",function(value){
      if($scope.modal && value && $scope.getSelectedFriend().length == 0){
        $scope.closeModal();
      }

      //Masquer bouton Annuler
      if($scope.getSelectedFriend() && $scope.getSelectedFriend().length == 0){
        enableCancelButton(false);
      }
      else if (!$scope.rightButtons && $scope.getSelectedFriend() && $scope.getSelectedFriend().length > 0)  enableCancelButton(true);
    },true)

    $scope.reset= function(){
      angular.forEach($scope.friends, function(value){
        value.enabled = false;
      })
    }

    $scope.addFriend=function(friend,event){
      if(event.target.tagName != 'INPUT'){
        if(friend.enabled){
          friend.enabled = false;
        }
        else{
          friend.enabled = true;
        }
      }
      else{
        console.log("ignore")
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

    $scope.getSelectedFriend = function(){
      return $filter('filter')($scope.friends,{enabled:true});
    }

    $scope.sendFriendsInvitation = function(message){
      UserService.sendFriendsInvitation($scope.getSelectedFriend(),message);
    }
  }])

  .controller('leftMenuCtrl', ['$scope','UserService','$state',function($scope,UserService,$state) {
    $scope.$on('toggleSideMenu',function(){
      $scope.sideMenuController.toggleLeft();
    })

    $scope.$on('closeSideMenu',function(){
      $scope.sideMenuController.close();
    })

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
      UserService.login();
    };
  }])

  .controller('MainCtrl', ['$scope','$state','UserService','application_conf','$rootScope','$ionicLoading',"ConnectService",
    function($scope, $state,UserService,application_conf,$rootScope,$ionicLoading,ConnectService) {
    $scope.application_conf = application_conf;
    console.log("CONFIGURATION",application_conf)
    $scope.leftButtons = [{
      type: 'button-clear',
      content: '<i class="icon ion-navicon">',
      tap: function (e) {
        $scope.$broadcast('toggleSideMenu');
      }
    }];

    $scope.closeMenu = function(){
      //$scope.$broadcast('closeSideMenu');
    }


    $scope.$watch(UserService.user, function(data){
      console.log("user change",data)
      $scope.user = data;
    },true)


    $scope.toIntro = function(){
      window.localStorage['didTutorial'] = 'false';
      $scope.$broadcast('closeSideMenu');
      $state.go('menu.intro');
    }

    /*début loading*/
    // Trigger the loading indicator
    $rootScope.showLoading = function(message) {
      message = message || "Chargement";

      // Show the loading overlay and text
      $rootScope.loading = $ionicLoading.show({

        // The text to display in the loading indicator
        content: '<i class=" ion-loading-c"></i> '+ message,

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



  }]);