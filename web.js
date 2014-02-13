var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use("production");
//app.use(gzippo.staticGzip("" + __dirname + "/public"));
app.listen(process.env.PORT || 5000);