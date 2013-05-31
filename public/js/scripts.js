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
username = document.getElementById('Username');
password = document.getElementById('Password');
//alert(username.value);
//alert(password.value);
console.log("Received: %s %s", username.value, password.value);
console.trace();
//db.open(function (err) {

    //db.collection('Users', function (err, coll) {
        //coll.insert({"User": username.value, "Pass": password.value}, function (err) {});
    //window.location.href = '/';
//return false;	
    });
});
}
