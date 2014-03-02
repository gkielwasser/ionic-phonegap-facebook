'use strict';

angular.module('starter')

.run(["$rootScope","$state","$urlRouter","application_conf","application_conf_web","application_conf_mobile",
  function($rootScope,$state,$urlRouter,application_conf,application_conf_web,application_conf_mobile) {

    //Start Fastclick
    FastClick.attach(document.body);


    $rootScope.$on('$stateChangeSuccess', function(evt,toSate) {

      // Halt state change from even starting
      evt.preventDefault();

      // Perform custom logic
      var meetsRequirement;

      if(window.localStorage['didTutorial'] === "true") {
        console.log('Skip intro',toSate);
        meetsRequirement = true;
        $rootScope.enableSideMenu = true;
      }
      else{
        console.log('Do intro',toSate);
        meetsRequirement = false;
        $rootScope.enableSideMenu = false;
      }

      // Continue with the update and state transition if logic allows
      if (meetsRequirement) $urlRouter.sync();
      else $state.go('menu.intro');
    });


    if (cordova ) {
      angular.extend(application_conf.facebook,application_conf_mobile.facebook);
      angular.extend(application_conf.general,application_conf_mobile.general);
    }
    else{
      angular.extend(application_conf.facebook,application_conf_web.facebook);
      angular.extend(application_conf.general,application_conf_web.general);
    }

  }])