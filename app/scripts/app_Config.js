var nativeInterface;
if(typeof CDV !== "undefined"){
  console.log("Cordova is defined **!")
  nativeInterface = CDV.FB;
}
else{
  console.log("Cordova is defined **!")
}

angular.module('starter')

.value('application_conf', {
    facebook : {
      permissions: "basic_info",
      friends_fields: "id,last_name,first_name,last_name,picture,installed",
      me_fields: "username,picture"
    },
    general:{

    }
  })
.constant('application_conf_web', {
    general: {
      overflowScroll : false,
      has_bouncing : false,
      application_path : "192.168.0.42:9000/",
      scroll : {
        items_preloaded : 30,
        items_to_load: 10
      }
    },
    facebook: {
      init: {
        appId: "711009162272801",
        frictionlessRequests: true,
        status:false
      }
    }
})
.constant('application_conf_mobile', {
    general: {
      overflowScroll : false,
      has_bouncing : false,
      scroll : {
        items_preloaded : 30,
          items_to_load: 10
      }
    },

    facebook:{
      init: {
        appId: "711009162272801",
       oauth: true,
        localSDK: 'facebook-js-sdk.js',
        nativeInterface: nativeInterface,
        status: false,
       frictionlessRequests: true,
        useCachedDialogs: false,
       cookies:true
      }
    }
})
