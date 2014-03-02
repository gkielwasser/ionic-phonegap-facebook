'use strict';

angular.module('starter.filters', [])


  .filter('startFrom', function() {

    return function(input, start) {
      return (input) ? input.slice(start) : false;
    };
  })

  .filter('friendsSearch', function() {
    return function(friends, search) {
      var filtered = [];
      if(friends && search ){
        angular.forEach(friends, function(friend){
          (friend.first_name.toLowerCase().indexOf(search.toLowerCase()) != -1
            || friend.last_name.toLowerCase().indexOf(search.toLowerCase()) != -1) ? filtered.push(friend):false;
        })
      }
      else if(friends && !search){
        return friends;
      }
      return filtered;
    };
  });