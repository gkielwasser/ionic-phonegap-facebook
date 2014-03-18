'use strict';

angular.module('starter')

.run(["$rootScope","$state","$urlRouter","application_conf","application_conf_web","application_conf_mobile","UserService",
  function($rootScope,$state,$urlRouter,application_conf,application_conf_web,application_conf_mobile,UserService) {

    //Start Fastclick
    FastClick.attach(document.body);



    $rootScope.$on('$stateChangeSuccess', function(evt,toSate) {

      // Halt state change from even starting
      evt.preventDefault();

      if(window.localStorage['didTutorial'] === "true") {
        console.log('Skip intro',toSate);

        $rootScope.enableSideMenu = true;
/*
        //Utilisateur non connecté arrive sur page
        if(!UserService.logged() && toSate.access != 0){
          $state.go("menu.home");
        }
        else{
          $urlRouter.sync();
        }
        */
        $urlRouter.sync();
      }
      else{
        //console.log('Do intro',toSate);
        $state.go('menu.intro');
        $rootScope.enableSideMenu = false;
      }
});


    if (typeof cordova !== "undefined" ) {
      angular.extend(application_conf.facebook,application_conf_mobile.facebook);
      angular.extend(application_conf.general,application_conf_mobile.general);
    }
    else{
      angular.extend(application_conf.facebook,application_conf_web.facebook);
      angular.extend(application_conf.general,application_conf_web.general);
    }

  }])