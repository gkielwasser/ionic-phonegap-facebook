angular.module('starter')

.value('application_conf', {
    facebook : {
      permissions: "basic_info",
      friends_fields: "id,name,first_name,picture,installed"
    },
    general:{

    }
  })
.constant('application_conf_web', {
    general: {
      overflowScroll : true,
      application_path : "192.168.0.45:9000/"
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
      overflowScroll : false
    },
    facebook:{
      init: {
        appId: "711009162272801",
        //'oauth': true,
        'localSDK': 'facebook-js-sdk.js',
        'nativeInterface': CDV.FB
        //status: true,
        //frictionlessRequests: true,
        //useCachedDialogs: false
      }
    }
})
