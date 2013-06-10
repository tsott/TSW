var score_counter=0;

$(document).ready(function () {


$('#Cancel').click(function() {
    window.location.href = '/';
    return false;
});

$('#music').click(function() {
    $('#music_box').remove();
    $('#music').remove();
        return false;
});

$('#single').click(function() {
    $('#score').append('<p>Your score is: ' + score_counter + '</p>');
    $('#options').children().remove();
    $('#logo').remove();

    	$("#pong").pong({
            "speed":2500,
            "pad_height":100
        });
        $('#pong_score1').prop('disabled', true); //TS score inputs now disabled
    $('#pong_score2').prop('disabled', true);
        return false;
});

$('#multi').click(function() {

	$('.form').append('<script type="text/javascript" src=\'/js/jquery-pong-0.4.1-right-p2.js\'></script>');

	$('#options').children().remove();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////END_SOCKETS
$('#score').append('<p>Your score is: ' + score_counter + '</p>');
$('#logo').remove();
$("#pong").pong({
        "speed":2500,
        "pad_height":100
    });
    $('#pong_score1').prop('disabled', true); //TS score inputs now disabled
$('#pong_score2').prop('disabled', true);
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
