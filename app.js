
var express = require('express');
var bodyParser = require('body-parser');
var sub_app_index = require('./router/router')
var conf = require('./conf').get(process.env.NODE_ENV);
var path = require('path');
var app = express();

app.locals.pretty = true;
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(err, req, res, next) {
  console.log("ERROR : APP.JS");
  console.log("MSG: "+err);
})

app.use('/', sub_app_index)

app.listen(conf.server.port, function(){
  console.log("'Bamboo' Keyword Analysis Program is Running on %s port", conf.server.port);


});
