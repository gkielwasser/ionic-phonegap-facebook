angular.module("starter",["ionic","ngTouch","starter.services","starter.controllers","starter.directives","facebook","checklist-model"]).run(["$rootScope","$state","$urlRouter",function(a,b,c){FastClick.attach(document.body),a.$on("$locationChangeSuccess",function(a){a.preventDefault();var d;"true"===window.localStorage.didTutorial?(console.log("Skip intro"),d=!0):(console.log("Do intro"),d=!1),d?c.sync():b.go("intro")})}]).config(["$stateProvider","$urlRouterProvider","FacebookProvider",function(a,b,c){a.state("tab",{url:"/tab","abstract":!0,templateUrl:"views/tabs.html"}).state("tab.pet-index",{url:"/pets",views:{"pets-tab":{templateUrl:"views/pet-index.html",controller:"PetIndexCtrl"}}}).state("tab.pet-detail",{url:"/pet/:petId",views:{"pets-tab":{templateUrl:"views/pet-detail.html",controller:"PetDetailCtrl"}}}).state("tab.adopt",{url:"/adopt",views:{"adopt-tab":{templateUrl:"views/adopt.html"}}}).state("tab.swipe",{url:"/swipe",views:{"swipe-tab":{templateUrl:"views/swipe.html"}}}).state("tab.friends",{url:"/friends",views:{"friends-tab":{templateUrl:"views/list.html",controller:"FriendsCtrl"}}}).state("tab.about",{url:"/about",views:{"about-tab":{templateUrl:"views/about.html"}}}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"LoginCtrl"}).state("intro",{url:"/intro",templateUrl:"views/intro.html",controller:"IntroCtrl"}),b.otherwise("/tab/about"),c.init("711009162272801")}]).filter("startFrom",function(){return function(a,b){return b=+b,a.slice(b)}}),angular.module("starter.controllers",[]).controller("PetIndexCtrl",["$scope","PetService",function(a,b){a.pets=b.all()}]).controller("PetDetailCtrl",["$scope","$stateParams","PetService",function(a,b,c){a.pet=c.get(b.petId)}]).controller("IntroCtrl",["$scope","$state",function(a,b){var c=function(){b.go("tab.pet-index"),window.localStorage.didTutorial=!0};"true"===window.localStorage.didTutorial&&(console.log("Skip intro"),c()),a.next=function(){a.$broadcast("slideBox.nextSlide")};var d=[{content:"Suivant",type:"button-positive ion ion-ionic",tap:function(){a.next()}}],e=[{content:"Passer",type:"button-positive",tap:function(){c()}}];a.leftButtons=e,a.rightButtons=d,a.slideChanged=function(b){a.leftButtons=b>0?[{content:"Précédent",type:"button-positive",tap:function(){a.$broadcast("slideBox.prevSlide")}}]:e,a.rightButtons=2==b?[{content:"Start using MyApp",type:"button-positive",tap:function(){c()}}]:d}}]).controller("FriendsCtrl",["$scope","UserService",function(a,b){a.friends=b.friends(),a.selectedFriends=[],a.addFriend=function(b,c){"n"!=c.target.className[0]&&(-1==a.selectedFriends.indexOf(b)?a.selectedFriends.push(b):a.selectedFriends.splice(a.selectedFriends.indexOf(b),1))},a.addItems=function(){for(var b=0;10>b;b++)if(a.friends.push(),a.friends.length>=a.maxItems)return void(a.canLoad=!1)}}]).controller("leftMenuCtrl",["$scope","UserService","$state","Facebook",function(a,b,c,d){a.logout=function(){b.logout(function(){c.go("login")})},a.login=function(){d.login(function(a){console.log("response fb",a)})}}]).controller("MainCtrl",["$scope","$state","Facebook","UserService",function(a,b,c,d){a.$watch(d.logged,function(b){console.log("logged cahnge",b),a.user=b}),a.$watch(function(){return c.isReady()},function(){a.facebookReady=!0}),a.$on("Facebook:load",function(a,b){console.log("Facebook:load",b)}),a.toIntro=function(){window.localStorage.didTutorial="false",b.go("intro")}}]).controller("LoginCtrl",["$scope","UserService","Facebook",function(a,b,c){a.user=b,a.login=function(){c.login(function(a){console.log("response fb",a)})},a.logout=function(){c.logout(function(){})}}]),angular.module("starter.services",[]).factory("PetService",function(){var a=[{id:0,title:"Cats",description:"Furry little creatures. Obsessed with plotting assassination, but never following through on it."},{id:1,title:"Dogs",description:"Lovable. Loyal almost to a fault. Smarter than they let on."},{id:2,title:"Turtles",description:"Everyone likes turtles."},{id:3,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:4,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:5,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:6,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:7,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:8,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:9,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:10,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:11,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:12,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."},{id:13,title:"Sharks",description:"An advanced pet. Needs millions of gallons of salt water. Will happily eat you."}];return{all:function(){return a},get:function(b){return a[b]}}}).factory("UserService",["$rootScope","Facebook",function(a,b){var c={};a.$on("Facebook:login",function(b,c){a.$apply(function(){console.log("Facebook:login",c),"connected"==c.status?d():e()})}),a.$on("Facebook:logout",function(b,c){a.$apply(function(){console.log("Facebook:logout",c),e()})}),a.$on("Facebook:prompt",function(a,b){console.log("Facebook:prompt",b)}),a.$on("Facebook:sessionChange",function(a,b){console.log("Facebook:sessionChange",b)}),a.$on("Facebook:statusChange",function(a,b){"connected"==b.status||e()}),a.$on("Facebook:authResponseChange",function(a,b){console.log("Facebook:authResponseChange",b)});var d=function(){g(),f()},e=function(){c={}},f=function(){b.api("/me/friends?fields=name,first_name,picture",function(b){a.$apply(function(){c.friends=b.data,console.log(b.data)})})},g=function(){b.api("/me",function(b){a.$apply(function(){c.me=b})})};return{logged:function(){return c.me?c.me:!1},profile:function(){return c.profile},friends:function(){return c.friends},logout:function(){return console.log("logout"),b.logout(function(){})}}}]),angular.module("starter.directives",[]).directive("infiniteScroll",["$window",function(){return{link:function(a,b,c){var d=parseInt(c.threshold)||0,e=b[0];b.bind("scroll",function(){a.$eval(c.canLoad)&&e.scrollTop+e.offsetHeight>=e.scrollHeight-d&&a.$apply(c.infiniteScroll)})}}}]);