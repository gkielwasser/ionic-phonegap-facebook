angular.module('templates-main', ['views/404.html', 'views/about.html', 'views/friends.html', 'views/friendsConfirmationModal.html', 'views/home.html', 'views/inputs-test.html', 'views/intro.html', 'views/leftMenu.html', 'views/login.html', 'views/menu.html', 'views/subscribedFriends.html']);

angular.module("views/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/404.html",
    "<ion-view title=\"'404'\">\n" +
    "    <ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\">\n" +
    "        404!!!!!!\n" +
    "    </ion-content>\n" +
    "</ion-view>\n" +
    "");
}]);

angular.module("views/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/about.html",
    "<ion-view title=\"'À propos'\" left-buttons='leftButtons' >\n" +
    "  <ion-content has-header=\"true\"  padding=\"true\">\n" +
    "      <div class=\"row text-center\">\n" +
    "          <div class=\"col text-center\">\n" +
    "              <h2>Application multiplateforme</h2>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <br/>\n" +
    "\n" +
    "      <div class=\"row responsive-sm\">\n" +
    "          <div class=\"col\">\n" +
    "              <div class=\"text-center\">\n" +
    "                  <img ng-src=\"images/ionic.png\" style=\"margin-bottom: 10px;\" width=\"128px\" height=\"128px\" class=\"ionic-logo\">\n" +
    "                  <br/>\n" +
    "                  <i style=\"font-size:50px;margin-bottom: 10px;color: grey;\" class=\"ion ion-plus-round text-center\"></i>\n" +
    "                  <br/>\n" +
    "                  <img src=\"images/angular.jpg\"  width=\"128px\" height=\"128px\">\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"col col-top\">\n" +
    "              <label>\n" +
    "                  Cette application a été conçue dans l'optique de pouvoir apporter une solution multiplateforme adaptée et optimisée pour\n" +
    "                  <i style=\"font-style:italic;\">téléphone mobile</i> mais aussi pour des <i style=\"font-style:italic;\">tablettes</i> où des\n" +
    "                  <i style=\"font-style:italic;\">ordinateurs de bureaux</i>.\n" +
    "              </label>\n" +
    "          </div>\n" +
    "          <div class=\"col col-center\">\n" +
    "              <label>Elle permet de mettre en évidence les performances suffisantes à une bonne expérience utilisateur que l'on peut atteindre en se fondant sur des technologies  telles que le HTML, JS et CSS.\n" +
    "                  Le <a href=\"http://ionicframework.com/\" TARGET=\"_blank\"> framework Ionic</a>\n" +
    "                  a été utilisé afin de faciliter la création d'applications hybrides mobiles.\n" +
    "                  Il fournit des composants permettant de développer efficacement des interfaces utilisateurs très interactives.\n" +
    "              </label>\n" +
    "          </div>\n" +
    "          <div class=\"col col-bottom\">\n" +
    "              <label>\n" +
    "                  L'utilisation du <a href=\"http://angularjs.org/\" TARGET=\"_blank\"> framework Angular.js</a> assure la possibilité de créer une application complexe et évolutive. Ses atouts:\n" +
    "                  modularité du code, maintenabilité de l'application et réutilisabilité du code tout en assurant une excellente testabilité de l'application.\n" +
    "              </label>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <br/>\n" +
    "\n" +
    "      <div class=\"row text-center\">\n" +
    "          <div class=\"col text-center\">\n" +
    "              <img src=\"images/phonegap.png\">\n" +
    "              <h3>Développez une seule fois et déployez n'importe où!</h3>\n" +
    "              <label>\n" +
    "                  L'utilisation de Phonegap va permettre de transformer l'application web en une véritable application native destinées aux terminaux IOS, Android, Windows Phone, BlackBerry et webOs.\n" +
    "              </label>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "\n" +
    "  </ion-content>\n" +
    "</ion-view>\n" +
    "");
}]);

angular.module("views/friends.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/friends.html",
    "<ion-view title=\"'Amis: ' + friends.length\" left-buttons='leftButtons' right-buttons=\"rightButtons\">\n" +
    "    <!--<div class=\"bar bar-subheader\" style=\"top:45;padding:0;\">\n" +
    "\n" +
    "    </div>-->\n" +
    "    <!--style=\"top:92px;\"-->\n" +
    "    <ion-content has-header=\"true\" has-tabs=\"true\"  overflow-scroll=\"{{application_conf.general.overflowScroll}}\" on-infinite-scroll=\"loadMore()\" infinite-scroll-distance=\"10%\">\n" +
    "\n" +
    "        <ul class=\"list fade-in-not-out\">\n" +
    "            <div class=\"item item-input-inset\" style=\"padding:6px;\">\n" +
    "                <label class=\"item item-input item-input-wrapper\" style=\"padding-top:0;padding-bottom: 0;\">\n" +
    "                    <i class=\"icon ion-search placeholder-icon\"></i>\n" +
    "                    <input type=\"text\" placeholder=\"Search\" ng-model=\"search\" class=\"searchBar\" ng-change=\"searching(search)\" style=\"line-height: 24px;height:34px;\">\n" +
    "                    <button class=\"button button-clear\" ng-click=\"search=''\">X</button>\n" +
    "                </label>\n" +
    "                <!-- <button class=\"button button-clear\" ng-click=\"reset()\">Annuler</button>-->\n" +
    "            </div>\n" +
    "            <!-- <mlz-ui-table-view list=\"friends\" row-height=\"100\" view-buffer=\"20\" style=\"height: 455px; \">\n" +
    "                 <label id=\"{{item.$$position}}\" ng-repeat=\"item in items track by item.$$position\">\n" +
    "                     <dt ng-bind=\"item.name\"></dt>\n" +
    "                 </label>-->\n" +
    "\n" +
    "             <li post-repeat-directive class=\"item item-thumbnail-left selectable item-icon-right\" ng-click=\"addFriend(friend,$event)\" ng-repeat=\"friend in filteredFriends\">\n" +
    "               <img ng-src=\"{{friend.picture.data.url}}\" width=\"50\" height=\"50\">\n" +
    "               <h2>{{friend.first_name}}</h2>\n" +
    "               <h4>{{friend.last_name}}</h4>\n" +
    "               <h4 style=\"color:#66cc33\" ng-if=\"friend.installed\">membre</h4>\n" +
    "\n" +
    "               <label class=\"checkbox icon\">\n" +
    "               <input type=\"checkbox\" name=\"{{friend.id}}\" ng-model=\"friend.enabled\">\n" +
    "               </label>\n" +
    "            </li>\n" +
    "\n" +
    "            <!--    </mlz-ui-table-view> -->\n" +
    "        </ul>\n" +
    "        <ion-infinite-scroll ng-if=\"!noMoreScroll\"></ion-infinite-scroll>\n" +
    "    </ion-content>\n" +
    "\n" +
    "    <div class=\"tabs tabs-icon-left\" >\n" +
    "\n" +
    "        <a  ng-controller=\"ModalCtrl\" class=\"tab-item selectable\" data-ng-click=\"openModal()\" ng-show=\"getSelectedFriend().length > 0 \">\n" +
    "            <i class=\"icon ion-email\" ></i>\n" +
    "            Inviter <span style=\"position:relative;top:0;right:0 \" class=\"badge badge-balanced\">{{(friends|filter:{enabled:true}).length}}</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a class=\"tab-item\" ng-show=\"numberOfPages > 1 && currentPage != 0\" style=\"max-width: 52px\" ng-click=\"previousPage()\">\n" +
    "            <i class=\"ion-chevron-left button\" style=\"border-top:0;border-bottom: 0\" ></i>\n" +
    "        </a>\n" +
    "\n" +
    "        <i ng-show=\"numberOfPages > 1\" style=\"color:#f0b840;min-width: inherit;font-size: 15px;padding: 0px 5px 0px 5px;\" >{{currentPage+1}}</i>\n" +
    "        <i ng-show=\"numberOfPages > 1\" style=\"color: grey;\">/</i>\n" +
    "        <i ng-show=\"numberOfPages > 1\" style=\"color:#f0b840;min-width: inherit;font-size: 15px;padding: 0px 5px 0px 5px;\" >{{numberOfPages}}</i>\n" +
    "\n" +
    "        <a  class=\"tab-item\" ng-show=\"numberOfPages > 1 && (currentPage +1!= numberOfPages)\" style=\"max-width: 52px\" ng-click=\"nextPage()\">\n" +
    "            <i class=\"ion-chevron-right button\" style=\"border-top:0;border-bottom: 0\" ></i>\n" +
    "        </a>\n" +
    "\n" +
    "        {{filteredFriends.length}}\n" +
    "\n" +
    "    </div>\n" +
    "</ion-view>");
}]);

angular.module("views/friendsConfirmationModal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/friendsConfirmationModal.html",
    "<div class=\"modal\">\n" +
    "\n" +
    "    <ion-header class=\"bar bar-header bar-energized\">\n" +
    "        <h1 class=\"title\">Confirmation des invitations</h1>\n" +
    "        <button class=\"button button-energized\" ng-click=\"closeModal()\">Annuler</button>\n" +
    "    </ion-header>\n" +
    "<!--{{application_conf.general.overflowScroll}}-->\n" +
    "    <ion-content has-header=\"true\" overflow-scroll=\"{{application_conf.general.overflowScroll}}\">\n" +
    "        <div class=\"padding\">\n" +
    "        <div class=\"list\">\n" +
    "\n" +
    "            <ul class=\"list\" >\n" +
    "                <li class=\"item item item-thumbnail-left selectable item-icon-right\" ng-repeat=\"friend in friends|filter:{enabled:true}\" ng-click=\"addFriend(friend,$event)\">\n" +
    "                    <img ng-src=\"{{friend.picture.data.url}}\" width=\"50\" height=\"50\">\n" +
    "                    <h2>{{friend.first_name}}</h2>\n" +
    "                    <h4>{{friend.last_name}}</h4>\n" +
    "                    <label class=\"checkbox icon\">\n" +
    "                        <input type=\"checkbox\" name=\"{{friend.id}}\" ng-model=\"friend.enabled\">\n" +
    "                    </label>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <div class=\"list list-inset\">\n" +
    "                <label class=\"item item-input  item-stacked-label\">\n" +
    "                    <span class=\"input-label\">Votre message d'invitation</span>\n" +
    "                    <input type=\"text\" ng-model=\"message\" placeholder=\"ex: Voilà une super application pour ...\">\n" +
    "                </label>\n" +
    "            </div>\n" +
    "\n" +
    "            <button class=\"button button-full button-positive\" ng-click=\"sendFriendsInvitation(message);closeModal()\">Inviter <span style=\"position:relative;top:0;right:0 \" class=\"badge badge-balanced\">{{(friends|filter:{enabled:true}).length}}</span></button>\n" +
    "        </div>\n" +
    "</div>\n" +
    "    </ion-content>\n" +
    "</div>");
}]);

angular.module("views/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/home.html",
    "<ion-view title=\"'Accueil'\" left-buttons='leftButtons' >\n" +
    "    <ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col text-center\">\n" +
    "                <h2 ng-click=\"paceStart()\">Bienvenue sur cette application d'aucune utilité.</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br/>\n" +
    "\n" +
    "        <div ng-cloack class=\"row homeDisconnected\" ng-if=\"!user.logged\">\n" +
    "            <div class=\"col text-center\">\n" +
    "                <h3>Pour commencer à l'utiliser, connectez-vous avec votre compte Facebook.</h3>\n" +
    "                <button class=\"button button-calm\" ng-click=\"login()\">\n" +
    "                    <i class=\"ion ion-locked\"></i> Se connecter\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "\n" +
    "    <div class=\"tabs tabs-icon-top\" >\n" +
    "        <a class=\"tab-item selectable\" ng-click=\"toIntro()\">\n" +
    "            <i class=\"icon ion-help-buoy\"></i> Relancer le tutorial\n" +
    "        </a>\n" +
    "        <a class=\"tab-item selectable\" href=\"#/inputs\">\n" +
    "            <i class=\"icon ion-beaker\"></i> Test features\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</ion-view>");
}]);

angular.module("views/inputs-test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/inputs-test.html",
    "<ion-view title=\"'Différents inputs'\">\n" +
    "    <ion-content has-header=\"true\"  padding=\"true\">\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Email</span>\n" +
    "            <input type=\"email\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Telephone</span>\n" +
    "            <input type=\"tel\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Number</span>\n" +
    "            <input type=\"number\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Date</span>\n" +
    "            <input type=\"date\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Month</span>\n" +
    "            <input type=\"month\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Password</span>\n" +
    "            <input type=\"password\">\n" +
    "        </label>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n" +
    "");
}]);

angular.module("views/intro.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/intro.html",
    "<ion-view left-buttons=\"leftButtons\" right-buttons=\"rightButtons\">\n" +
    "\n" +
    "\n" +
    "        <ion-slide-box does-continue=\"true\" on-slide-changed=\"slideChanged(index)\">\n" +
    "            <ion-slide>\n" +
    "                <h3>Merci d'avoir choisi cette application!</h3>\n" +
    "                <div id=\"logo\">\n" +
    "                    <img src=\"http://code.ionicframework.com/assets/img/app_icon.png\">\n" +
    "                </div>\n" +
    "                <p>\n" +
    "                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n" +
    "                    Donec id quam quis risus feugiat semper. Ut viverra posuere libero, hendrerit malesuada eros ullamcorper porttitor. Fusce bibendum urna nisi, vel congue risus tincidunt eu.\n" +
    "                </p>\n" +
    "                <p>\n" +
    "                    Aliquam nec lacinia ante, aliquet tempor ipsum. Nulla eget erat malesuada.\n" +
    "                </p>\n" +
    "            </ion-slide>\n" +
    "            <ion-slide>\n" +
    "                <h3>Utilisation de l'application</h3>\n" +
    "\n" +
    "                <div id=\"list\">\n" +
    "\n" +
    "                    <ol>\n" +
    "                        <li>Neque porro quisquam est qui dolorem ipsum</li>\n" +
    "                        <li>Aut pugnaciter turba sortis omnium</li>\n" +
    "                        <li>Et et non sole lucis</li>\n" +
    "                    </ol>\n" +
    "                </div>\n" +
    "            </ion-slide>\n" +
    "            <ion-slide>\n" +
    "                <h3>Pugnaciter turba sortis?</h3>\n" +
    "                <p>\n" +
    "                    Abstergendae ut fultum contemplans fiduciam ut germanum haerebat introisset multis poterit germanum metuens poterit Caenos quod cecidisse se hortabatur ad properaret.\n" +
    "                </p>\n" +
    "            </ion-slide>\n" +
    "        </ion-slide-box>\n" +
    "    <!--\n" +
    "    <div class=\"tabs tabs-icon-left\" >\n" +
    "        <a class=\"tab-item selectable\">\n" +
    "\n" +
    "        </a>\n" +
    "    </div>-->\n" +
    "</ion-view>");
}]);

angular.module("views/leftMenu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/leftMenu.html",
    "<div ng-controller=\"leftMenuCtrl\">\n" +
    "    <ion-header class=\"bar bar-header bar-assertive\">\n" +
    "        <img style=\"height:34px;\" ng-src=\"{{user.me.picture.data.url}}\">\n" +
    "        <div class=\"title\">{{user.me.username}}</div>\n" +
    "    </ion-header>\n" +
    "    <ion-content has-header=\"true\">\n" +
    "        <ul class=\"list selectable\">\n" +
    "            <a class=\"item item-icon-left\" ng-click=\"closeMenu('menu.home')\">\n" +
    "                <i class=\"icon ion-home\"></i>\n" +
    "                Accueil\n" +
    "            </a>\n" +
    "\n" +
    "            <a ng-hide=\"user.logged\" class=\"item item-icon-left\" ng-click=\"login()\">\n" +
    "                <i class=\"icon ion-locked\"></i>\n" +
    "                Connexion\n" +
    "            </a>\n" +
    "\n" +
    "            <a ng-show=\"user.logged\" class=\"item item-icon-left\" ng-click=\"closeMenu('menu.friends')\">\n" +
    "                <i class=\"icon ion-person-stalker\"></i>\n" +
    "                <ng-pluralize count=\"user.friends.length\"\n" +
    "                              when=\"{'0': 'Aucun amis',\n" +
    "                     'one': 'Mon ami',\n" +
    "                     'other': 'Mes {} amis'}\">\n" +
    "                </ng-pluralize>\n" +
    "            </a>\n" +
    "\n" +
    "            <a ng-show=\"user.logged\" class=\"item item-icon-left\" ng-click=\"closeMenu('menu.subscribedFriends')\">\n" +
    "                <i class=\"icon ion-heart\"></i>\n" +
    "                Amis membres\n" +
    "                <span class=\"badge badge-balanced\">{{(user.friends | filter:{installed:true}).length }}</span>\n" +
    "            </a>\n" +
    "\n" +
    "            <a class=\"item item-icon-left\" ng-click=\"closeMenu('menu.about')\">\n" +
    "                <i class=\"icon ion-help\"></i>\n" +
    "                À propos\n" +
    "            </a>\n" +
    "\n" +
    "            <a ng-show=\"user.logged\" class=\"item item-icon-left\" href=\"#\" ng-click=\"closeMenu('menu.about');logout()\">\n" +
    "                <i class=\"icon ion-power\"></i>\n" +
    "                Déconnexion\n" +
    "            </a>\n" +
    "        </ul>\n" +
    "    </ion-content>\n" +
    "</div>");
}]);

angular.module("views/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/login.html",
    "<ion-view title=\"'Login'\">\n" +
    "    <ion-content has-header=\"true\" has-tabs=\"true\" padding=\"true\">\n" +
    "\n" +
    "        <div ng-show=\"!user.logged()\">\n" +
    "            <button class=\"button button-block\" ng-class=\"{'button-positive':test,'button-energized':!test}\" ng-click=\"login()\">\n" +
    "                Connexion\n" +
    "            </button>\n" +
    "            connecté:{{loggedIn}}\n" +
    "            user: {{user}}\n" +
    "            friends:{{friends}}\n" +
    "            <button class=\"button\" ng-click=\"toIntro()\">Do Tutorial Again</button>\n" +
    "        </div>\n" +
    "        <div ng-show=\"user.logged()\">\n" +
    "            <button class=\"button button-block\"  ng-click=\"logout()\">\n" +
    "                Déconnexion\n" +
    "            </button>\n" +
    "        </div>\n" +
    "\n" +
    "    </ion-content>\n" +
    "</ion-view>\n" +
    "");
}]);

angular.module("views/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/menu.html",
    "<ion-side-menus>\n" +
    "    <!-- Center content -->\n" +
    "    <ion-pane ion-side-menu-content drag-content=\"enableSideMenu\" >\n" +
    "        <ion-nav-bar type=\"bar-positive\"></ion-nav-bar>\n" +
    "\n" +
    "        <ion-nav-view name=\"menuContent\" animation=\"slide-right-left\"></ion-nav-view>\n" +
    "    </ion-pane>\n" +
    "\n" +
    "    <!-- Left menu -->\n" +
    "    <ion-side-menu side=\"left\" id=\"menu-left\">\n" +
    "        <ng-include src=\"'views/leftMenu.html'\"></ng-include>\n" +
    "    </ion-side-menu>\n" +
    "\n" +
    "</ion-side-menus>");
}]);

angular.module("views/subscribedFriends.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/subscribedFriends.html",
    "<ion-view data-title=\"'Amis: ' + friends.length\" left-buttons='leftButtons' ng-init=\"initSubscribedFriends()\">\n" +
    "    <ion-content has-header=\"true\" has-tabs=\"true\" overflow-scroll=\"{{application_conf.general.overflowScroll}}\">\n" +
    "\n" +
    "        <ul class=\"list\" >\n" +
    "            <li class=\"item item item-thumbnail-left item-icon-right\" ng-repeat=\"friend in friends\">\n" +
    "                <img ng-src=\"{{friend.picture.data.url}}\">\n" +
    "                <h2>{{friend.first_name}}</h2>\n" +
    "                <h4>{{friend.name}}</h4>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </ion-content>\n" +
    "\n" +
    "    <div class=\"tabs tabs-icon-left\" >\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</ion-view>");
}]);
