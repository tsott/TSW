/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , signup = require('./routes/signup')
  , http = require('http')
  , path = require('path');
  

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('Players', server);
db.open(function(err, db) {
  if(!err) {
    console.log("Database up and running! :) ");
  }
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/signup', signup.register); //TS registration page added
app.post('/signup', function(req, res) {
    console.log(JSON.stringify(req.body));

    console.log('req.body.name', req.body['nick']);
});
//app.get('/login', login.login);
//app.post('/signup', function(req, res){
//var username = req.body.nick;
//var password = req.body.password;
//console.log("Received: %s %s", username, password);
//});

                              
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
