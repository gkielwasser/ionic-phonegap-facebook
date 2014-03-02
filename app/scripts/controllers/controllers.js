'use strict';

angular.module('starter.controllers', [])


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
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  }])




