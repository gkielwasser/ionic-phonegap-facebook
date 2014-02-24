angular.module('starter').constant('facebookConfiguration',
  {
    permissions: "basic_info",
    friends_fields: "id,name,first_name,picture,installed",
    cordova_conf: {
      appId: "711009162272801",
      //'oauth': true,
      'localSDK': 'facebook-js-sdk.js',
      'nativeInterface': CDV.FB
      //status: true,
      //frictionlessRequests: true,
      //useCachedDialogs: false
    },
    web_conf: {
      appId: "711009162272801",
      frictionlessRequests: true,
      status:false
    }
  }
)