'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('starter'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,UserService) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });


  }));

  it('should idsplay homeDisconnected if user is not connected', function () {
    expect(angular.element('.homeDisconnected').count()).toEqual(1);
    //expect(element('#myModal').css('display')).toBe('none');
  });
});
