/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , signup = require('./routes/signup')
  , game = require('./routes/game')
  , http = require('http')
  , path = require('path');
  

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));  //TS Custom Favicon Trial
app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
var username; //TS global variables for username and password

/////////////////////////////////////////////////////MONGO/////////////////////////////////////////////////
var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {safe: true});
var db = new Db('Players', server);
db.open(function(err, db) {
	//db.collection('Users', function (err, coll) {
//coll.insert({"User": username.value, "Pass": password.value}, function (err) {});
  if(!err) {
    console.log("Database is up and running! :) ");
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function add_player(){
//db.open(function (err) {
//db.collection('Users', function (err, coll) {
//coll.insert({"User": username.value, "Pass": password.value}, function (err) {});

//}
//}
//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/game', game.play); //TS game page added
app.get('/signup', signup.register); //TS registration page added
                           
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

