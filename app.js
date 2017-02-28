
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var moment = require('moment');
var fs = require('fs');
var sqlite3 = require('sqlite3');
var randomstring = require('randomstring');
var bodyParser = require("body-parser");

var login = require('./routes/login');

var index = require('./routes/index');

var entry = require('./routes/entry');

var add = require('./routes/add');

var setting = require('./routes/setting');

var database = require('./routes/database');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', login.viewLogin);

app.get('/index', index.view);
app.get('/indexB', index.viewPlayButton);

app.get('/entry/:id', entry.viewEntry);

app.get('/add', add.viewAdd);

app.get('/setting', setting.viewSetting);

app.post('/login', login.saveLoginName);

app.post('/insertMemory', database.insertMemory);
app.post('/deleteMemory', database.deleteMemory);
app.post('/updateMemory', database.updateMemory);

app.post("/test", function(req,res){

  var data = String(req.body.data.toString().match(/,(.*)$/)[1]);
  var decodeData = new Buffer(data.toString(), 'base64');
  fs.writeFile('./test.webm', decodeData, function (err){
      if (err) return console.log(err);
   });
});

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
