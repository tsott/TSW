/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , signup = require('./routes/signup')
  , game = require('./routes/game')
, http = require('http')
 ,path = require('path');
 
var app = express()

 
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
var login_username; //TS global variables for username and password
var login_password;

//development only

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/game', game.play); //TS game page added
app.get('/signup', signup.register); //TS registration page added               
                           
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SOCKETS
var io = require('socket.io');
var socket = io.listen(server);
var i=0;
var user;

socket.on('connection', function (client) {
   var user = (client.id);
  client.user = user;

  i++;
           console.log('Connected player number: ' + i + ' has id: ' + user);

  if(i>2){
  	client.emit('too_many_players');
  };

  if(i==1){
  client.emit('player1');
  }
  if(i==2){
  client.emit('player2');
  }
  socket.on('move', function(y){
  console.log(y);	
  });

  //socket.on('start_for_p1', function(client){									//TS allow player 1 to click start only when p2 started
  	//client.emit('start_the_game');
  //});
  client.on("disconnect", function() {
      i--;
      console.log("i: " + i);
    });
    
    
  client.on('add_score1', function(){
  	client.broadcast.emit('add1');
  });  
  client.on('add_score2', function(){
  	client.broadcast.emit('add2');
  });  

  client.on('position_all', function(stuff){
  	socket.emit('pass_the_ball', stuff);
  });
    //client.on('ball_position', function(){
  	  //client.broadcast.emit('pos');
    //});
    
    //client.on('scores', function(){
  	  //client.broadcast.emit('
  //});

  client.on('yPos', function (data){
    client.broadcast.emit('yPos', data);
  });

  client.on('y2Pos', function (data){
    client.broadcast.emit('y2Pos', data);
  });

  client.on('moveBall', function (data){
    client.broadcast.emit('moveBall', data);
  });


});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////END_SOCKETS
