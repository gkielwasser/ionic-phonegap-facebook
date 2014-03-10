'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
  gzippo = require('gzippo');

// Controllers
var controllers = require('./lib/controllers');

var app = express();

app.configure('production', function(){
  app.set('views', __dirname + '/www/views');
  app.use(express.favicon(path.join(__dirname, 'www', 'favicon.ico')));
  //app.use(express.static(path.join(__dirname, 'www')));
  app.use(gzippo.staticGzip("" + __dirname + "www"));

  // Angular Routes
  app.get('/views/*', controllers.partials);
  app.get('/*', controllers.indexProd);

});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

  // Router needs to be last
	app.use(app.router);
});



// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});