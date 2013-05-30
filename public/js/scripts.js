$(document).ready(function () {

$('#Register').click(function() {
    window.location.href = '/signup';
    return false;
});

$('#Cancel').click(function() {
    window.location.href = '/';
    return false;
});
/*
//$("Sign_up").click(function(){
  $("form").submit(function(){
    $.post($(this).attr("action"), $(this).serialize(), function(jsonData){
      console.log(jsonData);
    }, "json");
  });
//});

$('#Log_in').click(function() {
alert("dziala");
    return false;
});
*/
$('#single').click(function() {
$('#options').children().remove();
$('#logo').remove();
$('#score').append('Your score is:');
	$("#pong").pong({
        "speed":1000,
        "pad_height":100
    });
    return false;
});

$('#multi').click(function() {
	
    return false;
});
});



function submit() {
window.location.href = '/game';
return false;	
}

function register() {
var username = document.getElementById('Username');
var password = document.getElementById('Password');
console.log("Received data");
window.location.href = '/';
return false;	

//alert(Username.value);
//alert(Password.value);  //dotad dziala

//console.log("Received: %s %s", username, password);
//db.Players.insert( { Username: username, Password: password } );
//window.location.href = '/';
//db.collection('Players', function (err, coll) {
  //      coll.insert({"Username": username, "Password": password}, function (err) {

//
}
