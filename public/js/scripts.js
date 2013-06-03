var score_counter=0;

$(document).ready(function () {

$('#Register').click(function() {
    window.location.href = '/signup';
    return false;
});

$('#Cancel').click(function() {
    window.location.href = '/';
    return false;
});

$('#single').click(function() {
$('#score').append('<p>Your score is: ' + score_counter + '</p>');
$('#options').children().remove();
$('#logo').remove();

	$("#pong").pong({
        "speed":1000,
        "pad_height":100
    });
    $('#pong_score1').prop('disabled', true); //TS score inputs now disabled
$('#pong_score2').prop('disabled', true);
    return false;
});

$('#multi').click(function() {
	$('#score').append('Your score is:');
		$('#options').children().remove();
$('#logo').remove();
$('#options').append('Obecnie nie ma innych graczy online<br />');
$('#options').append('<input type="button" value="Leave game" class="btn btn-primary" id="back_button" onclick="go_back();"/>'); //TS create back button (go to /game)
    return false;
});
}); //document ready ends here

function submit() { 
window.location.href = '/game';
return false;	
}

function go_back() {
window.location.href = '/game';
return false;	
}

function register() {   //TS get user data
console.trace();
username = document.getElementById('Username');
password = document.getElementById('Password');
//alert(username.value);
//alert(password.value);
console.log("Received: %s %s", username.value, password.value)

}



//function getXhrObject() {  

    //var xhrObject = new XMLHttpRequest();  
//var ajaxCapable = getXhrObject();  
//ajaxCapable.send(username); 

//if (ajaxCapable.readyState == 4) {  
        //if (ajaxCapable.status == 200 || ajaxCapable.status == 304) {  
            //document.getElementById("content").innerHTML = ajaxCapable.responseText;  
//}
//}
//}
//$.ajax({
    //type: 'POST',
    //url: '/app.js',
    //async: false,
    //data: username,
    //success: function(data) {
       //alert('response data = ' + data);
    //}
//});



//db.open(function (err) {

    //db.collection('Users', function (err, coll) {
        //coll.insert({"User": username.value, "Pass": password.value}, function (err) {});
    //window.location.href = '/';
//return false;	
