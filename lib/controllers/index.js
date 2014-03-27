'use strict';

var path = require('path');

exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);

  res.render(requestedView.split('/')[1], function(err, html) {
    if(err) {
      res.render('404');
    } else {
      res.send(html);
    }
  });
};

exports.indexProd = function(req, res) {
  //var ezik = {baseAPI : "http://ezik-api.herokuapp.com"};
  res.render('index');
};

exports.indexDev = function(req, res) {
  //var ezik = {baseAPI : "http://127.0.0.1:8000"};
  res.render('index');
};
