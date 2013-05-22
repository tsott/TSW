$(document).ready(function () {

    $("#pong").pong({
        "speed":1500,
        "pad_height":100
    });

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
});
