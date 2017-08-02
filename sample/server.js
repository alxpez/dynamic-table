var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/modules/bootstrap/css/bootstrap.min.css', function (req, res) {
  res.sendFile( __dirname + "/modules/bootstrap/css/" + "bootstrap.min.css" );
});
app.get('/modules/bootstrap/fonts/glyphicons-halflings-regular.woff', function (req, res) {
  res.sendFile( __dirname + "/modules/bootstrap/fonts/" + "glyphicons-halflings-regular.woff" );
});
app.get('/modules/bootstrap/fonts/glyphicons-halflings-regular.woff2', function (req, res) {
  res.sendFile( __dirname + "/modules/bootstrap/fonts/" + "glyphicons-halflings-regular.woff2" );
});
app.get('/modules/bootstrap/fonts/glyphicons-halflings-regular.ttf', function (req, res) {
  res.sendFile( __dirname + "/modules/bootstrap/fonts/" + "glyphicons-halflings-regular.ttf" );
});

app.get('/modules/angular/angular.min.js', function (req, res) {
  res.sendFile( __dirname + "/modules/angular/" + "angular.min.js" );
});

app.get('/modules/ui-bootstrap/ui-bootstrap-tpls.js', function (req, res) {
  res.sendFile( __dirname + "/modules/ui-bootstrap/" + "ui-bootstrap-tpls.js" );
});

app.get('/modules/dynamic-table/dynamic-table.min.js', function (req, res) {
  res.sendFile( __dirname + "/modules/dynamic-table/" + "dynamic-table.min.js" );
});

app.get('/app/app.js', function (req, res) {
  res.sendFile( __dirname + "/app/" + "app.js" );
});

app.get('/app/main.controller.js', function (req, res) {
  res.sendFile( __dirname + "/app/" + "main.controller.js" );
});

app.get('/app/table.model.js', function (req, res) {
  res.sendFile( __dirname + "/app/" + "table.model.js" );
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});