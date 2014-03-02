'use strict';

(function (window, document) {

  function onWindowLoad() {
    if (window.cordova){
      console.log("we are on mobile")
      // on device add ready listener
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      console.log("we are on browser")
      // on browser trigger onDeviceReady
      onDeviceReady();
    }
    window.removeEventListener('load', onWindowLoad, false);
  }
  window.addEventListener('load', onWindowLoad, false);

  function onDeviceReady() {
    function checkConnection() {
      console.log(navigator.connection);
      if(navigator.connection==undefined) {
        window.localStorage.setItem("internetAccessFlag","false");
      } else {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
          window.localStorage.setItem("internetAccessFlag","false");
        } else {
          window.localStorage.setItem("internetAccessFlag","true");
        }
        //alert(window.localStorage.getItem("internetAccessFlag"));
      }
    }

    function bootstrapApplication(removeListeners){
      angular.bootstrap(document, ['starter']);

      if(removeListeners){
        document.removeEventListener('online',false);
        document.removeEventListener('resume',false);
      }
    }

    if(!window.cordova){
      console.log("brower check")
      if(navigator.onLine){
        window.localStorage.setItem("internetAccessFlag","true");
      }
      else{
        window.localStorage.setItem("internetAccessFlag","false");
      }
    }
    else{
      console.log("mobile check")
      checkConnection();
    }
    //if(true){
    if(window.localStorage.getItem("internetAccessFlag") == "true"){
      // bootstrap app
      angular.element(document).ready(function () {
        console.log("ANGULAR WILL BOOTSTRAP")
        bootstrapApplication();
      });
    }
    else{
      alert("Vous devez être connecté à Internet");
      document.addEventListener("resume", function() {
        console.log("ONLINE")
        bootstrapApplication();
      }, false);
      document.addEventListener("online", function() {
        console.log("ONLINE")
        bootstrapApplication();
      }, false);
    }

    document.removeEventListener('deviceready', onDeviceReady, false);
  }
})(window, document);